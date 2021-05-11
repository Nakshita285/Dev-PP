let filterColors =[
    {name:"pink", code: "#e84393" },
    {name:"blue", code: "#0097e6"},
    {name:"red", code: "#c23616"},
    {name:"yellow", code: "#fbc531"},
    {name:"green", code: "#16a085"}
]


let selectedFilter = "green";
let uid = new ShortUniqueId();

let allFilters = document.querySelectorAll('.filter-choose .container div');
let addTicketBtn = document.querySelector('.add-ticket');
let ticketContainer = document.querySelector('.ticket-container');
let deleteTicketBtn = document.querySelector('.delete-ticket');

// load tickets when we open the site 

function loadTickets(){
    if(localStorage.getItem("allTickets")){
        ticketContainer.innerHTML = "";
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        for (let i = 0 ; i < allTickets.length ; i++){
            // object destructing 
            let {uniqueID, ticketFilter, ticketContent} = allTickets[i];

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("tickets");
            ticketDiv.innerHTML =   `<div class="filter-and-lock">
            <div class="ticket-filter ${ticketFilter}">
            <div class ="lock">
                <i class="fas fa-lock"></i>
                <i class="fas fa-unlock"></i></div>    
            </div>
            </div>
            <div class ="ticket-info">
                <div class="ticket-id">#${uniqueID}</div>
                <div class="del-ticket">
                    <i class="del fas fa-trash fa-2x"id=${uniqueID}></i>
                </div>
            </div>
            <div class="ticket-content">${ticketContent}</div> `;
            
            ticketDiv.querySelector(".ticket-filter").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".del-ticket i").addEventListener("click", handleTicketDelete);
            ticketContainer.append(ticketDiv);
        }
    }
}

loadTickets();

addTicketBtn.addEventListener("click", openNewModalTicket);
deleteTicketBtn.addEventListener("click", deleteNewModalTicket);

function handleTicketDelete(event){
    let ticketToBeDeletedID = event.target.id;
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
 
    let filteredTickets = allTickets.filter(function(ticketObject){
        return ticketObject.uniqueID != ticketToBeDeletedID;
    })
    ticketContainer.innerHTML = "";
    localStorage.setItem("allTickets", JSON.stringify(filteredTickets));
    
    loadTickets();
 }

 function toggleTicketFilter(e){
    let currentFilter = e.target.classList[1];
    let filters = ["pink", "blue", "red","yellow", "green"];
    let idx = filters.indexOf(currentFilter);
    idx++;
    idx = idx % filters.length;
    // console.log(idx);
    let currentTicket = e.target;
    currentTicket.classList.remove(currentFilter);
    currentTicket.classList.add(filters[idx]);

    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let id = currentTicket.nextElementSibling.childNodes[3].firstElementChild.id;
    
    for (let i =0;i < allTickets.length;i++){
        if(allTickets[i].uniqueID == id){
            allTickets[i].ticketFilter = filters[idx];
        }
    }
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}


function deleteNewModalTicket(e){
    if(document.querySelector('.modal-page')){
        document.querySelector('.modal-page').remove();
    }
}

function openNewModalTicket(e){
    let modal = document.querySelector(".modal-page");
    if(modal){
        return;
    }
    let modalPageDiv = createModal();

    modalPageDiv.querySelector(".modal-input").addEventListener("click", clearModalTextBox);
    modalPageDiv.querySelector(".modal-input").addEventListener("keypress", ticketCreator);
    // modal-ppage is changed from modal-input
    let allModalFilter = modalPageDiv.querySelectorAll(".modalFilter");

    for (let i=0;i<allModalFilter.length;i++){
       allModalFilter[i].addEventListener("click", chooseModalFilter);

    }

    ticketContainer.append(modalPageDiv);   
}

function createModal(){
    let modalPageDiv = document.createElement("div");
    modalPageDiv.classList.add("modal-page");
    modalPageDiv.innerHTML = `<div class="modal-input" data-typed="false" contenteditable="true" value="default value">
    Type Your Text Here !!!
    </div>
    <div class="modal-filter-option">
    <div class="modalFilter pink"></div>
    <div class="modalFilter blue"></div>
    <div class="modalFilter red"></div>
    <div class="modalFilter yellow"></div>
    <div class="modalFilter green active-filter"></div>
    </div>`;

    return modalPageDiv;
}

function chooseModalFilter(e){
    let chosenFilter = e.path[0].classList[1];
    if(chosenFilter == selectedFilter){
        return;
    }
    selectedFilter = chosenFilter;

    document.querySelector(".modalFilter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}

function ticketCreator(event){
    // console.log(e.key);

    if(event.key == "Enter"){
        let ticketTextContent = event.target.textContent;
        let uniqueID = uid();
        let ticketsDiv = document.createElement("div");
        ticketsDiv.classList.add("tickets");
        ticketsDiv.innerHTML = `<div class="ticket-filter ${selectedFilter}"></div>
        <div class ="ticket-info">
            <div class="ticket-id">#${uniqueID}</div>
            <div class="del-ticket">
                <i class="del fas fa-trash fa-2x"id=${uniqueID}></i>
            </div>
            </div>
        <div class="ticket-content">${ticketTextContent}</div>`;
        
        ticketContainer.append(ticketsDiv);
        event.target.parentNode.remove();

        // here the ticket has been added on the document 

        if(!localStorage.getItem('allTickets')){
            let allTickets = [];
    
            let ticketObject = {};
            ticketObject.uniqueID = uniqueID;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = ticketTextContent;
            
            allTickets.push(ticketObject);
            localStorage.setItem("allTickets", JSON.stringify(allTickets));
    
        }
    
        else {
            let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    
            let ticketObject = {};
            ticketObject.uniqueID = uniqueID;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = ticketTextContent;
            
            allTickets.push(ticketObject);
            localStorage.setItem('allTickets', JSON.stringify(allTickets));
    
        }

        selectedFilter = "green";
    }

}

function clearModalTextBox(e){
    if(e.target.getAttribute("data-typed") == "true"){
        return;
    }
    e.target.innerHTML = "";
    e.target.setAttribute("data-typed", "true");

}

for(let i =0; i<allFilters.length;i++){
    allFilters[i].addEventListener( 'click', chooseFilterFun);

}

function chooseFilterFun(event){
    if(event.target.classList.contains("active-filter")){
        event.target.classList.remove("active-filter");
        loadTickets();
        return;
    }

    if(document.querySelector(".box.active-filter")){
        document.querySelector(".active-filter").classList.remove("active-filter");
    }
    event.target.classList.add("active-filter");

    let filter = event.target.classList[0];

    loadFilteredTicket(filter);

    // let filterCode;
    // for(let i=0; i< filterColors.length; i++){
    //     if(filter == filterColors[i].name){
    //         filterCode = filterColors[i].code;
    //     }
    // }

    // ticketContainer.style.background = filterCode;

}

function loadFilteredTicket(filterTicket){
    if(localStorage.getItem("allTickets")){
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter( function(filterObject){
            return filterObject.ticketFilter == filterTicket;
        });
        // console.log(filteredTicket);
        ticketContainer.innerHTML = "";
    
        for (let i = 0 ; i < filteredTickets.length ; i++){
            // object destructing 
            let {uniqueID, ticketFilter, ticketContent} = filteredTickets[i];

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("tickets");
            ticketDiv.innerHTML =   `<div class="ticket-filter ${ticketFilter}"></div>
            <div class ="ticket-info">
            <div class="ticket-id">#${uniqueID}</div>
            <div class="del-ticket">
                <i class="del fas fa-trash fa-2x"id=${uniqueID}></i>
            </div>
            </div>
            <div class="ticket-content">${ticketContent}</div> `;
            
            ticketDiv.querySelector(".ticket-filter").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".del-ticket i").addEventListener("click", handleTicketDelete);
            ticketContainer.append(ticketDiv);  
        }
    }
}
