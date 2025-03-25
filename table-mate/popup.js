function handleStartClick() {
    chrome.runtime.sendMessage({ action: "startExtension" });
}

function handleStopClick() {
    chrome.runtime.sendMessage({ action: "stopExtension" });
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");

    startBtn.addEventListener("click", handleStartClick);
    stopBtn.addEventListener("click", handleStopClick);
});
