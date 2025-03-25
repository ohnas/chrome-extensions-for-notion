let isDragging = false;
let selectedCells = new Set();

// 테이블 감지 & 이벤트 추가
function enableTableSelection() {
    document.querySelectorAll("td").forEach(td => {
        td.style.cursor = "pointer"; 
        td.addEventListener("mousedown", handleMouseDown);
        td.addEventListener("mousemove", handleMouseMove);
    });
    document.addEventListener("mouseup", handleMouseUp);
}

// 마우스 클릭 (선택 시작)
function handleMouseDown(event) {
    if (event.target.tagName === "TD") {
        isDragging = true;
        clearSelection();
        selectCell(event.target);
    }
}

// 마우스 이동 (드래그 선택)
function handleMouseMove(event) {
    if (isDragging && event.target.tagName === "TD") {
        selectCell(event.target);
    }
}

// 마우스 떼면 (선택 종료 & 데이터 전송)
function handleMouseUp() {
    if (isDragging) {
        isDragging = false;
        sendSelectedData();
    }
}

// 선택된 셀 저장
function selectCell(cell) {
    if (!selectedCells.has(cell)) {
        cell.classList.add("selected");
        selectedCells.add(cell);
    }
}

// 선택 초기화
function clearSelection() {
    selectedCells.forEach(cell => cell.classList.remove("selected"));
    selectedCells.clear();
}

// 선택된 데이터 전송
function sendSelectedData() {
    let selectedData = [...selectedCells].map(cell => cell.innerText);
    chrome.runtime.sendMessage({ action: "updateData", data: selectedData });
}

// 익스텐션 활성화 상태에서만 작동
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "enableSelection") {
        enableTableSelection();
    }
});
