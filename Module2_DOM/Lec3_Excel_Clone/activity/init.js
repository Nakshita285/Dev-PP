let allCellsContentDiv = document.querySelector(".cells-content");
let dB;



function initCells(){

    // 1. top left cell block 
    let cellsContent = "<div class ='top-left-cell'> </div>";
    
    // 2. Top row Alhpabets
    cellsContent += `<div class ='top-row'>`
    for (let i =0; i<26;i++){
        cellsContent += `<div class ='top-row-cell'>${String.fromCharCode(i+65)}</div>`
    }
    cellsContent += `</div>`

    // 3. Left column Numbers
    cellsContent += `<div class ='left-col'>`
    for (let i=0;i<100;i++){
        cellsContent += `<div class = 'left-col-cell'>${i+1}</div>`
    }
    cellsContent += `</div>`
    
    // 4. Cells sheet
    cellsContent += `<div class ='cells'>`
    for (let i =0; i< 100;i++){
        cellsContent += "<div class ='row'>"
        for (let j=0;j<26;j++){
            cellsContent += `<div class ='cell' rowid='${i+1}' colid='${j+1}' contentEditable = 'true'></div>`
        }   
        cellsContent += "</div>"
     }
     cellsContent += `</div>`

     allCellsContentDiv.innerHTML = cellsContent;
}
initCells();


function initDB(){
    dB =[];
    for (let i=0;i<100;i++){
        let row = [];
        for (let j=0;j<26;j++){
            let name = String.fromCharCode(j+64)+(i)+"";
            let value = "";
            let cellObject ={
                name : name,
                value : value,
                formula : ""
            }
            row.push(cellObject);
        }  
        dB.push(row);
    } 
}
initDB();

