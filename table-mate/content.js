let isDragging = false;
let selectedCells = new Set();

// ✅ 셀 선택 기능 활성화
function enableTableSelection() {
  console.log("[TableMate] 테이블 선택 기능 활성화됨");

  document.querySelectorAll("td").forEach(td => {
    td.style.cursor = "pointer";
    td.addEventListener("mousedown", handleMouseDown);
    td.addEventListener("mousemove", handleMouseMove);
  });

  document.addEventListener("mouseup", handleMouseUp);
}

// ✅ 마우스 클릭 (선택 시작)
function handleMouseDown(event) {
  if (event.target.tagName === "TD") {
    isDragging = true;
    clearSelection();
    selectCell(event.target);
  }
}

// ✅ 마우스 이동 (드래그 선택)
function handleMouseMove(event) {
  if (isDragging && event.target.tagName === "TD") {
    selectCell(event.target);
  }
}

// ✅ 마우스 떼면 (선택 종료 & 데이터 전송)
function handleMouseUp() {
  if (isDragging) {
    isDragging = false;
    sendSelectedData();
  }
}

// ✅ 셀을 선택하고 스타일 적용
function selectCell(cell) {
  if (!selectedCells.has(cell)) {
    cell.classList.add("selected");
    selectedCells.add(cell);
  }
}

// ✅ 이전 선택 초기화
function clearSelection() {
  selectedCells.forEach(cell => cell.classList.remove("selected"));
  selectedCells.clear();
}

// ✅ 선택된 데이터 전송 (background로)
function sendSelectedData() {
  const selectedData = [...selectedCells].map(cell => cell.innerText);
  chrome.runtime.sendMessage({ action: "updateData", data: selectedData });
}

// ✅ background.js에서 보내는 메시지 처리
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "activateSelectionMode") {
    console.log("[TableMate] 커서 crosshair로 변경");
    document.body.style.cursor = "crosshair";
    enableTableSelection(); // 셀 선택도 함께 활성화
  }

  if (message.action === "deactivateSelectionMode") {
    console.log("[TableMate] 커서 default로 복귀");
    document.body.style.cursor = "default";
    clearSelection(); // 선택 해제
  }
});
