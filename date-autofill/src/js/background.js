const NOTION_API_KEY = "your_secret_api_key";  // ⚠ 크롬 스토리지로 이동할 예정
const DATABASE_ID = "your_database_id";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "fetchNotionData") {
        try {
            const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${NOTION_API_KEY}`,
                    "Content-Type": "application/json",
                    "Notion-Version": "2022-06-28"
                }
            });

            const data = await response.json();
            sendResponse(data);
        } catch (error) {
            console.error("Notion API 호출 오류:", error);
            sendResponse({ error: "Failed to fetch Notion API" });
        }
    }
    return true; // 비동기 응답을 허용
});
