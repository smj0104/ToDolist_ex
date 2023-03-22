
class TodoEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoEvent();
        }
        return this.#instance;
    }

    addEventAddTodoClick() {
        const addTodoButton = document.querySelector(".button-make-todo");
        const todoInput = document.querySelector(".todo-input");
        addTodoButton.onclick = () => {
            if(todoInput.value == ""){
                return;
            }else{
                TodoService.getInstance().addTodo();
                todoInput.value = "";
            }
        }
    }

    addEventAddTodoKeyUp() {
        const todoInput = document.querySelector(".todo-input");
        todoInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                const addTodoButton = document.querySelector(".button-make-todo");
                addTodoButton.click();
            }
        }
    }

    addEventDeleteTodoClilck() {
        const deleteTodoButton = document.querySelectorAll(".delete-button");
        deleteTodoButton.forEach((Button,index) => {
            Button.onclick = () =>{
                TodoService.getInstance().todoList.splice(index,1);
                TodoService.getInstance().updateLocalStorage();
            } 
        });
    }

    addEventCalendarClilck(){
        const calendarButton = document.querySelectorAll(".calendar-add-button");
        calendarButton.forEach((Button,index) =>{
            Button.onclick = () =>{
                TodoService.getInstance().todoList[index].calendar = TodoService.getInstance().todoList[index].todoContent;
                delete TodoService.getInstance().todoList[index].todoContent; 
                TodoService.getInstance().updateLocalStorage();
            }
        });
    }
    
    addEventModifyTodoClick() {
        const modifyButtons = document.querySelectorAll(".modify-b")
        modifyButtons.forEach((modifyButton, index) => {
            modifyButton.onclick = () => {
                ModalService.getInstance().showModal();
                ModalService.getInstance().modifyModal(index);
            }
        });
    }


}

class TodoService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TodoService();
        }
        return this.#instance;
    }
    todoList = null;


    constructor() {
        const label = document.querySelector(".calendar-choice");
        console.log(label);
        if(localStorage.getItem(label.textContent) == null){
            this.todoList = new Array();
        }else{
            this.todoList = JSON.parse(localStorage.getItem(label.textContent));
        }
        this.loadTodoList();
    } 

    updateLocalStorage() {
        const label = document.querySelector(".calendar-choice")
        localStorage.setItem(label.textContent, JSON.stringify(this.todoList));
        this.loadTodoList();
    }

    addTodo() {
        const todoInput = document.querySelector(".todo-input");   

        const todoObj = {
            todoContent: todoInput.value,
            calendar : null
        }

        this.todoList.push(todoObj);
        this.updateLocalStorage();
        this.loadTodoList();
    }

    crateTodoList(){
        const label = document.querySelector(".calendar-choice");
        if(localStorage.getItem(label.textContent) == null){
            this.todoList = new Array();
        }else{
            this.todoList = JSON.parse(localStorage.getItem(label.textContent));
        }
    }

    loadTodoList() {
        const todoContentList = document.querySelector(".jobs-todo");
        todoContentList.innerHTML = ``;
        this.todoList.forEach(todoObj => {
            if(todoObj.todoContent != undefined){
                todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                ${todoObj.todoContent}
                <div class="jobs-todo-detail">
                    <button class="calendar-add-button">
                        <i class="fa-regular fa-calendar-check"></i>
                    </button>
                    <button class="modify-b">
                        <i class="fa-sharp fa-solid fa-pen-nib"></i>
                    </button>
                    <button class="delete-button">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                </li>
            `;
            } else{
                todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                    Done
                <div class="jobs-todo-detail">
                    <button class="calendar-add-button" disabled>
                        <i class="fa-regular fa-calendar-check"></i>
                    </button>
                    <button class="modify-b" disabled>
                        <i class="fa-sharp fa-solid fa-pen-nib"></i>
                    </button>
                    <button class="delete-button" disabled>
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                </li>
            `;
            }
        });
        TodoEvent.getInstance().addEventDeleteTodoClilck();
        TodoEvent.getInstance().addEventCalendarClilck();
        TodoEvent.getInstance().addEventModifyTodoClick();
        
    }

}