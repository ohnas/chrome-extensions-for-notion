const table = document.querySelector("#dataTable");

// 셀 클릭 이벤트 핸들러
function handleCellClick(event) {
    let cell = event.target;
    
    // 클릭한 요소가 'td'일 때만 처리
    if (cell.tagName === "TD") {
        const rowIndex = cell.parentNode.rowIndex; // 행 번호
        const colIndex = cell.cellIndex; // 열 번호
        const value = cell.innerText; // 클릭한 셀의 데이터
        toggleCellSelection(cell);
        logCellData(rowIndex, colIndex, value);
    }
}

// 선택된 셀에 .selected 클래스 추가/제거
function toggleCellSelection(cell) {
    if (cell.classList.contains("selected")) {
        cell.classList.remove("selected"); // 선택 해제
    } else {
        cell.classList.add("selected"); // 선택된 상태
    }
}

function logCellData(row, col, value) {
    console.log(`클릭한 셀: 행 ${row}, 열 ${col}, 값: ${value}`);
}

table.addEventListener("click", handleCellClick);
