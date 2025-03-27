chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "displayData") {
        const data = message.data;
        const dataList = document.getElementById("dataList");
        dataList.innerHTML = "";

        // 선택한 데이터 표시
        data.content.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            dataList.appendChild(li);
        });

        // 통계 구분선
        const divider = document.createElement("hr");
        dataList.appendChild(divider);

        // 통계 제목
        const summaryTitle = document.createElement("li");
        summaryTitle.textContent = "📊 통계:";
        summaryTitle.style.fontWeight = "bold";
        dataList.appendChild(summaryTitle);

        // 숫자 데이터 처리
        if (data.type === "number") {
            const sum = data.content.reduce((acc, val) => acc + val, 0);
            const avg = (sum / data.content.length).toFixed(2);
            const min = Math.min(...data.content);
            const max = Math.max(...data.content);
            const count = data.content.length;

            const stats = [
                `- 합계: ${sum}`,
                `- 평균: ${avg}`,
                `- 최소: ${min}`,
                `- 최대: ${max}`,
                `- 개수: ${count}`
            ];

            stats.forEach(stat => {
                const statItem = document.createElement("li");
                statItem.textContent = stat;
                dataList.appendChild(statItem);
            });
        }

        // 텍스트 데이터 처리
        if (data.type === "text") {
            const count = data.content.length;
            const statItem = document.createElement("li");
            statItem.textContent = `- 개수: ${count}`;
            dataList.appendChild(statItem);
        }
    }
});

