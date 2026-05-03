chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.storage.sync.get({ links: [] }, ({ links }) => {
    if (Array.isArray(links) && links.length > 0) return;

    chrome.storage.sync.set({
      links: [
        {
          id: crypto.randomUUID(),
          title: "LinkedIn",
          url: "https://www.linkedin.com",
          keyword: "lin"
        },
        {
          id: crypto.randomUUID(),
          title: "Reddit",
          url: "https://www.reddit.com",
          keyword: "red"
        },
        {
          id: crypto.randomUUID(),
          title: "Twitter / X",
          url: "https://x.com",
          keyword: "tw"
        }
      ]
    });
  });
});
