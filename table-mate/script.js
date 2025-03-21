const table = document.querySelector("#dataTable");
let isDragging = false;  // 드래그 중인지 확인하는 변수
let selectedCells = new Set();  // 선택된 셀 저장
let selectedData = [];  // 선택된 데이터 저장

// 마우스 클릭 시 (선택 시작)
function handleMouseDown(event) {
    if (event.target.tagName === "TD") {
        isDragging = true;
        clearSelection();  // 기존 선택 해제
        selectCell(event.target);
    }
}

// 마우스 이동 시 (드래그 선택)
function handleMouseMove(event) {
    if (isDragging && event.target.tagName === "TD") {
        selectCell(event.target);
    }
}

// 마우스 떼면 (선택 종료 & 데이터 출력)
function handleMouseUp() {
    if (isDragging) {
        isDragging = false;
        printSelectedData();
    }
}

// 셀 선택 (클래스 추가 & 리스트에 저장)
function selectCell(cell) {
    if (!selectedCells.has(cell)) {
        cell.classList.add("selected");
        selectedCells.add(cell);
    }
}

// 선택된 데이터 리스트 초기화
function clearSelection() {
    selectedCells.forEach(cell => cell.classList.remove("selected"));
    selectedCells.clear();
}

// 선택된 데이터 콘솔 출력
function printSelectedData() {
    selectedData = [...selectedCells].map(cell => cell.innerText);
    console.log("선택된 데이터:", selectedData);
}

// 이벤트 리스너 추가
table.addEventListener("mousedown", handleMouseDown);
table.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
