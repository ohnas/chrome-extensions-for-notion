document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ action: "fetchNotionData" }, (response) => {
        const list = document.getElementById("notion-list");
        list.innerHTML = ""; // 기존 로딩 텍스트 제거

        if (response.error) {
            list.innerHTML = `<li>🚨 오류: ${response.error}</li>`;
            return;
        }

        response.results.forEach(page => {
            const properties = page.properties;
            const title = properties["이름"]?.title?.[0]?.text?.content || "제목 없음";
            const date = properties["날짜"]?.date?.start || "날짜 없음";

            const listItem = document.createElement("li");
            listItem.textContent = `📌 ${title} - 📅 ${date}`;
            list.appendChild(listItem);
        });
    });
});
