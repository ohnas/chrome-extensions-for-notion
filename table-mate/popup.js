function handleStartClick() {
    chrome.runtime.sendMessage({ action: "startExtension" });

    // ✅ 사이드패널 열기 (user gesture에 반응)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) return;

        chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: "sidepanel.html",
            enabled: true
        }).then(() => {
            chrome.sidePanel.open({ tabId: tab.id });
            console.log("[TableMate] 사이드패널 자동으로 열림");
        }).catch((err) => {
            console.warn("[TableMate] 사이드패널 열기 실패:", err.message);
        });
    });
}

function handleStopClick() {
    chrome.runtime.sendMessage({ action: "stopExtension" });

    // ✅ 사이드패널 닫기
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) return;

        chrome.sidePanel.setOptions({
            tabId: tab.id,
            enabled: false
        }).then(() => {
            console.log("[TableMate] 사이드패널 닫힘");
        }).catch((err) => {
            console.warn("[TableMate] 사이드패널 닫기 실패:", err.message);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");

    startBtn.addEventListener("click", handleStartClick);
    stopBtn.addEventListener("click", handleStopClick);
});

