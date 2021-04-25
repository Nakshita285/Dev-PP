let filterColors =[
    {name:"pink", code: "#e84393" },
    {name:"blue", code: "#0097e6"},
    {name:"red", code: "#c23616"},
    {name:"yellow", code: "#fbc531"},
    {name:"green", code: "#16a085"}
]

let allFilters = document.querySelectorAll('.filter-choose .container div');
let ticketContainer = document.querySelector('.ticket-container');
// console.log(allFilters);

for(let i =0; i<allFilters.length;i++){
    allFilters[i].addEventListener( 'click', chooseFilterFun);

}

function chooseFilterFun(event){
    let filter = event.target.classList[0];
    let filterCode
    for(let i=0; i< filterColors.length; i++){
        if(filter == filterColors[i].name){
            filterCode = filterColors[i].code;
        }
    }

    ticketContainer.style.background = filterCode;

}