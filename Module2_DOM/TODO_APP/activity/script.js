let inputTODO = document.querySelector('.todo-input');
let addTodoButton = document.querySelector('.add-todo');
let todosItems = document.querySelector('.todos-items');

// event addition
function addTodo(){
    let todo = inputTODO.value;
    if(todo){
        let listItems = document.createElement("li");
        listItems.classList.add("todo-items");

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-tasks");
        deleteButton.innerHTML = "Delete Task";

        deleteButton.addEventListener(  "click", function(event){
            console.log("delete button is clicked!!" );
            console.log(event);
            deleteTaskFun(event);
            // event.target.parentNode.childNodes[0].remove();
        })

        deleteButton.addEventListener(  "keypress", function(event){
            if(event.key == "Backspace"){
                console.log("backspace key is pressed");
                // deleteTaskFun(event);
            }
        })

        listItems.append(pTag, deleteButton);

        // appending li item to ul 
        todosItems.append(listItems);

        inputTODO.value = "";
    }
    else{
        alert("Oops! Incorrect or no input");
    }
}

addTodoButton.addEventListener( "click" , function(){
    addTodo();
})


inputTODO.addEventListener( "keypress", function(event){
    if(event.key == "Enter"){
        addTodo();
    }
})

function deleteTaskFun(event){
    event.target.parentNode.remove();
}
    /* 
        <li class="todo-items">
            <p class="todo">Todo</p>
            <button class="delete-tasks">Delete</button>
        </li>
        */