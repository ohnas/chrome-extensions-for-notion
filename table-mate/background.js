chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startExtension" || message.action === "stopExtension") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab) {
            console.error("[TableMate] 활성 탭 정보를 찾을 수 없습니다.");
            return;
            }

            console.log(`[TableMate] ${message.action} 메시지를 탭(${tab.id})에 전송`);

            // background → content.js로 메시지 전송
            chrome.tabs.sendMessage(tab.id, {
            action: message.action === "startExtension"
                ? "activateSelectionMode"
                : "deactivateSelectionMode"
            });
        });
    }
});
  
