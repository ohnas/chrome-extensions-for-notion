let extensionActive = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startExtension") {
        extensionActive = true;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: activateSelectionMode
            });
        });
    } 
    else if (message.action === "stopExtension") {
        extensionActive = false;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: deactivateSelectionMode
            });
        });
    }
});

function activateSelectionMode() {
    document.body.style.cursor = "crosshair"; // 포인터 변경
}

function deactivateSelectionMode() {
    document.body.style.cursor = "default"; // 기본 포인터로 변경
}
