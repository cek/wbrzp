function contextClick(info, tab) {
    var stext = "\"" + info.selectionText + "\" site:zwiftpower.com";
    chrome.tabs.create({
        url: "https://www.google.com/search?q=" + encodeURIComponent(stext)
    });
}

chrome.contextMenus.create({
     "title": "Zwiftpower search for \"%s\"",
     "contexts":["selection"],
     "documentUrlPatterns": ["*://*.zwiftpower.com/*"],
     "onclick": contextClick
});
