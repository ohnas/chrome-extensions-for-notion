const table = document.querySelector("#dataTable");

// 셀 클릭 이벤트 핸들러
function handleCellClick(event) {
    let cell = event.target;
    
    // 클릭한 요소가 'td'일 때만 처리
    if (cell.tagName === "TD") {
        const rowIndex = cell.parentNode.rowIndex; // 행 번호
        const colIndex = cell.cellIndex; // 열 번호
        const value = cell.innerText; // 클릭한 셀의 데이터
        
        logCellData(rowIndex, colIndex, value);
    }
}

function logCellData(row, col, value) {
    console.log(`클릭한 셀: 행 ${row}, 열 ${col}, 값: ${value}`);
}

table.addEventListener("click", handleCellClick);
