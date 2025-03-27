// TableMate Content Script (Refined)

let isDragging = false;
let selectedCells = new Set();

// ✅ 셀 선택 기능 활성화
function enableTableSelection() {
  console.log("[TableMate] Notion 테이블 셀 선택 활성화");

  const notionTables = document.querySelectorAll(".notion-table-view");
  console.log(notionTables);

  notionTables.forEach(table => {
    const cells = table.querySelectorAll(".notion-table-view-cell");
    cells.forEach(cell => {
      cell.style.cursor = "pointer";
      cell.addEventListener("mousedown", handleMouseDown);
      cell.addEventListener("mousemove", handleMouseMove);
    });
  });

  document.addEventListener("mouseup", handleMouseUp);
}

// ✅ 셀 선택 기능 비활성화
function disableTableSelection() {
  console.log("[TableMate] Notion 테이블 셀 선택 비활성화");

  const notionTables = document.querySelectorAll(".notion-table-view");

  notionTables.forEach(table => {
    const cells = table.querySelectorAll(".notion-table-view-cell");
    cells.forEach(cell => {
      cell.removeEventListener("mousedown", handleMouseDown);
      cell.removeEventListener("mousemove", handleMouseMove);
      cell.style.cursor = "";
    });
  });

  document.removeEventListener("mouseup", handleMouseUp);
}

// ✅ 노션 편집 진입 차단 (이벤트 전파 차단 방식)
function preventNotionEditBehavior() {
  const notionTables = document.querySelectorAll(".notion-table-view");
  if (!notionTables.length) return;

  console.log("[TableMate] Notion 편집 진입 이벤트 차단");
  notionTables.forEach(table => {
    table.addEventListener("click", stopEvent, true);
  });
}

// ✅ 노션 편집 진입 복원
function restoreNotionEditBehavior() {
  const notionTables = document.querySelectorAll(".notion-table-view");
  if (!notionTables.length) return;

  console.log("[TableMate] Notion 편집 진입 이벤트 복원");
  notionTables.forEach(table => {
    table.removeEventListener("click", stopEvent, true);
  });
}

function stopEvent(event) {
  event.stopImmediatePropagation();
  event.preventDefault();
}


// ✅ 마우스 클릭 (선택 시작)
function handleMouseDown(event) {
  isDragging = true;
  const cell = event.currentTarget;
  clearSelection();
  selectCell(cell);
}

// ✅ 마우스 이동 (드래그 선택)
function handleMouseMove(event) {
  if (!isDragging) return;
  const cell = event.currentTarget;
  selectCell(cell);
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
  const rawValues = [...selectedCells].map(cell => cell.innerText.trim());

  const isNumericArray = rawValues.every(value => /^-?\d+(\.\d+)?$/.test(value));

  const parsedData = {
    type: isNumericArray ? "number" : "text",
    content: isNumericArray ? rawValues.map(Number) : rawValues
  };

  console.log("[TableMate] 전송할 데이터:", parsedData);

  chrome.runtime.sendMessage({ action: "updateData", data: parsedData });
}


// ✅ 커서 변경
function forceCursor(cursorType) {
  const existingStyle = document.getElementById("tablemate-cursor-style");
  if (existingStyle) {
    existingStyle.textContent = `* { cursor: ${cursorType} !important; }`;
  } else {
    const style = document.createElement("style");
    style.id = "tablemate-cursor-style";
    style.textContent = `* { cursor: ${cursorType} !important; }`;
    document.head.appendChild(style);
  }
}

// ✅ background.js에서 보내는 메시지 처리
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "activateSelectionMode") {
    console.log("[TableMate] 커서 crosshair로 변경");
    forceCursor("crosshair");
    preventNotionEditBehavior(); // 🛡️ 편집 진입 차단
    enableTableSelection();
    // highlightNotionTables();
  }

  if (message.action === "deactivateSelectionMode") {
    console.log("[TableMate] 커서 default로 복귀");
    forceCursor("default");
    restoreNotionEditBehavior(); // 🔓 편집 진입 복원
    clearSelection();
    disableTableSelection(); // ✅ 셀 이벤트 제거
    // removeHighlightFromTables();
  }
});



// // ✅ 테이블 하이라이팅 적용
// function highlightNotionTables() {
//   console.log("[TableMate] 테이블 하이라이팅 적용");

//   // overflow: visible 설정
//   fixTableContainersOverflow();

//   // 회색 배경 오버레이 추가
//   if (!document.getElementById("tablemate-overlay")) {
//     const overlay = document.createElement("div");
//     overlay.id = "tablemate-overlay";
//     document.body.appendChild(overlay);
//   }

//   // 각 테이블에 강조 클래스 추가
//   document.querySelectorAll(".notion-table-view").forEach(table => {
//     table.classList.add("highlighted-table");
//   });
// }

// // ✅ 테이블 하이라이팅 제거
// function unhighlightNotionTables() {
//   console.log("[TableMate] 테이블 하이라이팅 제거");

//   // 강조 클래스 제거
//   document.querySelectorAll(".notion-table-view").forEach(table => {
//     table.classList.remove("highlighted-table");
//   });

//   // overlay 제거
//   const overlay = document.getElementById("tablemate-overlay");
//   if (overlay) overlay.remove();

//   // overflow 원래대로 복원
//   restoreTableContainersOverflow();
// }

// // ✅ 강조 보이게 하기 위한 overflow 수정
// function fixTableContainersOverflow() {
//   const containers = document.querySelectorAll(".notion-scroller.horizontal.notion-collection-view-body");
//   containers.forEach(container => {
//     container.style.overflow = "visible";
//   });
// }

// // ✅ 원래 overflow 상태로 복원
// function restoreTableContainersOverflow() {
//   const containers = document.querySelectorAll(".notion-scroller.horizontal.notion-collection-view-body");
//   containers.forEach(container => {
//     container.style.overflow = "auto";
//   });
// }
