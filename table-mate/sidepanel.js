chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "displayData") {
        let dataList = document.getElementById("dataList");
        dataList.innerHTML = "";
        message.data.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;
            dataList.appendChild(li);
        });
    }
});
