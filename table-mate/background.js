let extensionActive = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startExtension") {
        console.log("[TableMate] Start message received");
        extensionActive = true;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log("[TableMate] tabs 결과:", tabs);
            const tab = tabs[0];
            if (!tab) {
                console.error("[TableMate] 활성 탭 정보를 찾을 수 없습니다.");
                return;
            }
            console.log("[TableMate] Target tab ID:", tab.id);
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: activateSelectionMode
            });
        });
    } 
    else if (message.action === "stopExtension") {
        console.log("[TableMate] Stop message received");
        extensionActive = false;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log("[TableMate] tabs 결과:", tabs);
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
