let topLeftCell = document.querySelector(".top-left-cell");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");

let lastSelectedCell;

// document.querySelector("#address").value = "A1"; 

// event listener for scrolling properly
allCellsContentDiv.addEventListener("scroll", function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    // 1. top left cell is fixed from both the side 
    // 2. top row -> top is fixed
    // 3. left col -> left is fixed 

    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";
})

// Address Box working
// first we need to get col number and row number 

// this for loop for number box 
for (let i=0;i<allCells.length;i++){

    allCells[i].addEventListener("click", function(e){
        
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        // console.log(rowId, colId);
        // console.log(String.fromCharCode(64+rowId), colId);
        let address = String.fromCharCode(64+colId) + rowId;
        // console.log(address);
        addressInput.value = address;   // it will show the input box for address
    })

    allCells[i].addEventListener("blur", function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = dB[rowId][colId];
    
        if(cellValue == cellObject.value){
            return;
        }
    
        cellObject.value = cellValue;
    })
}

formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula){
        
        let {rowId, colId} = getRowColIdFromElement(lastSelectedCell);
        let cellObject = dB[rowId][colId];
        let computedValue = solveFormula(formula);
        // 1. db update
        cellObject.value = computedValue;
        cellObject.formula = formula;

        // 2. ui update
        lastSelectedCell.textContent = computedValue;
    }
})