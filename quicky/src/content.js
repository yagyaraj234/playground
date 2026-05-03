const DEFAULT_LINKS = [
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com", keyword: "lin" },
  { id: "reddit", title: "Reddit", url: "https://www.reddit.com", keyword: "red" },
  { id: "twitter", title: "Twitter / X", url: "https://x.com", keyword: "tw" }
];

const state = {
  links: DEFAULT_LINKS,
  matches: [],
  selectedIndex: 0,
  trigger: null,
  activeElement: null,
  suppressSubmitUntil: 0
};

const command = createCommand();
(document.body || document.documentElement).append(command.root);

chrome.storage.sync.get({ links: DEFAULT_LINKS }, ({ links }) => {
  state.links = sanitizeLinks(links);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.links) {
    state.links = sanitizeLinks(changes.links.newValue);
    refresh();
  }
});

document.addEventListener("input", refresh, true);
document.addEventListener("keyup", (event) => {
  if (["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab"].includes(event.key)) return;
  refresh();
}, true);
document.addEventListener("selectionchange", () => {
  if (document.activeElement === state.activeElement) refresh();
});

document.addEventListener(
  "keydown",
  (event) => {
    if (command.root.hidden) return;

    if (event.key === "ArrowDown") {
      swallow(event);
      moveSelection(1);
    } else if (event.key === "ArrowUp") {
      swallow(event);
      moveSelection(-1);
    } else if (event.key === "Enter" || event.key === "Tab") {
      const link = state.matches[state.selectedIndex];
      if (!link) return;
      swallow(event);
      insertLink(link);
    } else if (event.key === "Escape") {
      swallow(event);
      hideCommand();
    }
  },
  true
);

document.addEventListener(
  "keypress",
  (event) => {
    if (!command.root.hidden && (event.key === "Enter" || event.key === "Tab")) {
      swallow(event);
    }
  },
  true
);

document.addEventListener(
  "submit",
  (event) => {
    if (Date.now() < state.suppressSubmitUntil) {
      swallow(event);
    }
  },
  true
);

document.addEventListener("pointerdown", (event) => {
  if (!command.root.contains(event.target)) hideCommand();
});

function refresh() {
  const target = getEditableElement(document.activeElement);
  if (!target) {
    hideCommand();
    return;
  }

  const trigger = findTrigger(target);
  if (!trigger) {
    hideCommand();
    return;
  }

  state.activeElement = target;
  state.trigger = trigger;
  state.matches = filterLinks(trigger.query);
  state.selectedIndex = 0;
  renderCommand(trigger.query);
  positionCommand(target);
}

function findTrigger(target) {
  const beforeCursor = getTextBeforeCursor(target);
  const match = beforeCursor.match(/(^|[\s([{>"'])s\.([^\s]*)$/i);
  if (!match) return null;

  const query = match[2] || "";
  return {
    query,
    startOffset: beforeCursor.length - query.length - 2,
    endOffset: beforeCursor.length
  };
}

function filterLinks(query) {
  const normalizedQuery = normalize(query);
  return state.links
    .map((link, index) => ({ link, score: scoreLink(link, normalizedQuery), index }))
    .filter((item) => item.score > -1)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.link);
}

function scoreLink(link, query) {
  if (!query) return 10;

  const title = normalize(link.title);
  const keyword = normalize(link.keyword);
  const host = normalize(getHost(link.url));
  const haystack = `${title} ${keyword} ${host}`;

  if (keyword === query) return 100;
  if (keyword.startsWith(query)) return 92;
  if (title.startsWith(query)) return 86;
  if (host.startsWith(query)) return 78;
  if (haystack.includes(query)) return 70;
  if (isSubsequence(query, haystack)) return 52;
  if (closeToPrefix(query, title) || closeToPrefix(query, keyword) || closeToPrefix(query, host)) return 44;

  return -1;
}

function renderCommand(query) {
  command.query.textContent = query ? `Filter: ${query}` : "Choose a saved link";
  command.list.replaceChildren();

  if (!state.matches.length) {
    const empty = document.createElement("div");
    empty.className = "sdot-command__empty";
    empty.textContent = "No matching links";
    command.list.append(empty);
    command.root.hidden = false;
    return;
  }

  state.matches.forEach((link, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "sdot-command__item";
    item.setAttribute("aria-selected", String(index === state.selectedIndex));
    item.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      state.selectedIndex = index;
      insertLink(link);
    });

    const icon = document.createElement("span");
    icon.className = "sdot-command__icon";
    icon.textContent = link.title.slice(0, 1).toUpperCase();

    const copy = document.createElement("span");
    copy.className = "sdot-command__copy";

    const title = document.createElement("span");
    title.className = "sdot-command__title";
    title.textContent = link.title;

    const url = document.createElement("span");
    url.className = "sdot-command__url";
    url.textContent = getHost(link.url) || link.url;

    const shortcut = document.createElement("span");
    shortcut.className = "sdot-command__shortcut";
    shortcut.textContent = `s.${link.keyword || initials(link.title)}`;

    copy.append(title, url);
    item.append(icon, copy, shortcut);
    command.list.append(item);
  });

  command.root.hidden = false;
}

function moveSelection(direction) {
  if (!state.matches.length) return;
  state.selectedIndex = (state.selectedIndex + direction + state.matches.length) % state.matches.length;
  renderCommand(state.trigger.query);
}

function insertLink(link) {
  const target = state.activeElement;
  if (!target || !state.trigger) return;

  const replacement = link.url;
  state.suppressSubmitUntil = Date.now() + 500;

  if (isTextControl(target)) {
    const { value, selectionStart } = target;
    const start = selectionStart - (state.trigger.query.length + 2);
    setNativeValue(target, `${value.slice(0, start)}${replacement}${value.slice(selectionStart)}`);
    const cursor = start + replacement.length;
    target.setSelectionRange(cursor, cursor);
    target.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: replacement }));
  } else {
    replaceContentEditableTrigger(target, replacement);
  }

  hideCommand();
}

function swallow(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}

function replaceContentEditableTrigger(target, replacement) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const start = findTextPosition(target, state.trigger.startOffset);
  const end = findTextPosition(target, state.trigger.endOffset);

  if (!start || !end) {
    document.execCommand("insertText", false, replacement);
    return;
  }

  const triggerRange = document.createRange();
  triggerRange.setStart(start.node, start.offset);
  triggerRange.setEnd(end.node, end.offset);
  triggerRange.deleteContents();
  triggerRange.insertNode(document.createTextNode(replacement));
  triggerRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(triggerRange);
  target.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: replacement }));
}

function positionCommand(target) {
  const rect = getCaretRect(target) || target.getBoundingClientRect();
  const top = Math.min(rect.bottom + 8, window.innerHeight - 320);
  const left = Math.min(Math.max(12, rect.left), window.innerWidth - 372);

  command.root.style.top = `${Math.max(12, top)}px`;
  command.root.style.left = `${left}px`;
}

function getCaretRect(target) {
  if (isTextControl(target)) return getTextControlCaretRect(target);

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  const rect = range.getBoundingClientRect();
  return rect.width || rect.height ? rect : target.getBoundingClientRect();
}

function getTextControlCaretRect(target) {
  const rect = target.getBoundingClientRect();
  return {
    left: rect.left + 12,
    right: rect.left + 12,
    top: rect.top,
    bottom: rect.bottom,
    width: 0,
    height: rect.height
  };
}

function getTextBeforeCursor(target) {
  if (isTextControl(target)) {
    return target.value.slice(0, target.selectionStart ?? 0);
  }

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return "";
  const range = selection.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(target);
  preRange.setEnd(range.endContainer, range.endOffset);
  return preRange.toString();
}

function getEditableElement(element) {
  if (!element) return null;
  if (isTextControl(element)) return element;
  return element.isContentEditable ? element : null;
}

function isTextControl(element) {
  return element instanceof HTMLTextAreaElement ||
    (element instanceof HTMLInputElement &&
      /^(email|number|password|search|tel|text|url)?$/i.test(element.type));
}

function hideCommand() {
  command.root.hidden = true;
  state.matches = [];
  state.trigger = null;
}

function createCommand() {
  const root = document.createElement("div");
  root.className = "sdot-command";
  root.hidden = true;
  root.innerHTML = `
    <div class="sdot-command__header">
      <span class="sdot-command__kbd" aria-label="Quicky">
        <svg class="sdot-command__bolt" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.9 1.8 4.8 13.1h6.1L9.8 22.2l9.4-12.4h-6.3l1-8Z"></path>
        </svg>
      </span>
      <span class="sdot-command__query"></span>
    </div>
    <div class="sdot-command__list" role="listbox"></div>
  `;

  return {
    root,
    query: root.querySelector(".sdot-command__query"),
    list: root.querySelector(".sdot-command__list")
  };
}

function sanitizeLinks(value) {
  const source = Array.isArray(value) && value.length ? value : DEFAULT_LINKS;
  return source
    .filter((link) => link && link.title && link.url)
    .map((link) => ({
      id: link.id || crypto.randomUUID(),
      title: String(link.title),
      url: String(link.url),
      keyword: String(link.keyword || initials(link.title)).toLowerCase()
    }));
}

function normalize(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getHost(value) {
  try {
    return new URL(value).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function initials(value) {
  return String(value)
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .join("")
    .toLowerCase();
}

function isSubsequence(query, value) {
  let cursor = 0;
  for (const char of value) {
    if (char === query[cursor]) cursor += 1;
    if (cursor === query.length) return true;
  }
  return false;
}

function closeToPrefix(query, value) {
  if (!query || !value) return false;
  const prefix = value.slice(0, query.length);
  return levenshtein(query, prefix) <= Math.max(1, Math.floor(query.length / 3));
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, row) => [row]);
  for (let column = 1; column <= b.length; column += 1) matrix[0][column] = column;

  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function findTextPosition(root, index) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let traversed = 0;
  let node = walker.nextNode();

  while (node) {
    const length = node.textContent.length;
    if (traversed + length >= index) {
      return {
        node,
        offset: Math.max(0, index - traversed)
      };
    }
    traversed += length;
    node = walker.nextNode();
  }

  return null;
}

function setNativeValue(element, value) {
  const prototype = element instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  if (descriptor && descriptor.set) {
    descriptor.set.call(element, value);
  } else {
    element.value = value;
  }
}
