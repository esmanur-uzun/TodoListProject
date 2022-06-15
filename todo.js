const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const fisrtCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istiyor musunuz ?")){
        while(todoList.firstElementChild != null ){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
    filter.value="";
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(listItem => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFormStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Todo silindi");
    }
}

function deleteTodoFormStorage(deleteTodo){
    let todos = getTodosFromStorage();

    const list = todos; 
    list.forEach((todo,index) => {
        if (todo === deleteTodo){
            todos.splice(index,1); 
            return;
        }
    });
    localStorage.removeItem("todos"); 
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if (newTodo === "")
    {
        showAlert("danger","Lütfen bir todo girin");
    }
    else{
        let baseTodos = getTodosFromStorage(); 
        if(baseTodos.some(todo=> todo===newTodo)){ 
            showAlert("danger","Zaten Ekli!") 
            todoInput.value = "";
        } 
        else{ 
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
        } 

    }
    
    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}



function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();
   todos.push(newTodo);

   localStorage.removeItem("todos"); 
   localStorage.setItem("todos",JSON.stringify(todos));
   
}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent =message;
    fisrtCardBody.appendChild(alert);

    // setTimeOut

    setTimeout(function(){
        alert.remove();
    },1000)

}

function addTodoToUI(newTodo){

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href="#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.className = "list-group-item d-flex justify-content-between";

    // text node ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}
