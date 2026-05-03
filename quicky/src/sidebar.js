const DEFAULT_LINKS = [
  { title: "LinkedIn", url: "https://www.linkedin.com", keyword: "lin" },
  { title: "Reddit", url: "https://www.reddit.com", keyword: "red" },
  { title: "Twitter / X", url: "https://x.com", keyword: "tw" }
];

const form = document.querySelector("#link-form");
const titleInput = document.querySelector("#title");
const urlInput = document.querySelector("#url");
const keywordInput = document.querySelector("#keyword");
const saveButton = document.querySelector("#save-button span:last-child");
const list = document.querySelector("#link-list");
const emptyState = document.querySelector("#empty-state");
const template = document.querySelector("#link-item-template");

let links = [];
let editingId = null;

init();

function init() {
  chrome.storage.sync.get({ links: [] }, ({ links: storedLinks }) => {
    links = Array.isArray(storedLinks) && storedLinks.length
      ? storedLinks
      : DEFAULT_LINKS.map(withId);
    persist();
    render();
  });

  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();

  const nextLink = {
    id: editingId || crypto.randomUUID(),
    title: titleInput.value.trim(),
    url: normalizeUrl(urlInput.value.trim()),
    keyword: keywordInput.value.trim().toLowerCase()
  };

  if (!nextLink.title || !nextLink.url) return;

  links = editingId
    ? links.map((link) => (link.id === editingId ? nextLink : link))
    : [nextLink, ...links];

  editingId = null;
  saveButton.textContent = "Add link";
  form.reset();
  persist();
  render();
}

function render() {
  list.replaceChildren();
  emptyState.hidden = links.length > 0;

  links.forEach((link) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const host = getHost(link.url);
    node.querySelector(".link-icon").textContent = link.title.slice(0, 1).toUpperCase();
    node.querySelector(".link-title").textContent = link.title;
    node.querySelector(".link-url").textContent = host || link.url;
    node.querySelector(".link-keyword").textContent = link.keyword || initials(link.title);

    node.querySelector(".edit-button").addEventListener("click", () => {
      editingId = link.id;
      titleInput.value = link.title;
      urlInput.value = link.url;
      keywordInput.value = link.keyword || "";
      saveButton.textContent = "Save link";
      titleInput.focus();
    });

    node.querySelector(".delete-button").addEventListener("click", () => {
      links = links.filter((item) => item.id !== link.id);
      if (editingId === link.id) {
        editingId = null;
        saveButton.textContent = "Add link";
        form.reset();
      }
      persist();
      render();
    });

    list.append(node);
  });
}

function persist() {
  chrome.storage.sync.set({ links });
}

function normalizeUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function getHost(value) {
  try {
    return new URL(value).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function initials(value) {
  return value
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .join("")
    .toLowerCase();
}

function withId(link) {
  return {
    id: crypto.randomUUID(),
    ...link
  };
}
