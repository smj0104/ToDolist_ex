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
        const todoContents = document.querySelectorAll(".delete-button");
        todoContents.forEach((Button,index) => {
            Button.onclick = () =>{
                TodoService.getInstance().todoList.splice(index,1);
                TodoService.getInstance().updateLocalStorage();
            } 
        });
    }

    // addEventCalenderClilck(){
    //     const calenderButton = document.querySelector(".calendar-label");
    //     calenderButton.onclick = () =>{
    //         const calenderInput = document.querySelector(".calendar-input");

    //     }
    // }

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
        if(localStorage.getItem("todoList") == null) {
            this.todoList = new Array();
        }else {
            this.todoList = JSON.parse(localStorage.getItem("todoList"));
        }
        this.loadTodoList();
    }

    updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
    }

    addTodo() {
        const todoInput = document.querySelector(".todo-input");   

        const todoObj = {
            todoContent: todoInput.value
        }

        this.todoList.push(todoObj);
        this.updateLocalStorage();
        this.loadTodoList();
    }

    loadTodoList() {
        const todoContentList = document.querySelector(".jobs-todo");
        todoContentList.innerHTML = ``;

        this.todoList.forEach(todoObj => {
            todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                ${todoObj.todoContent}
                <div class="jobs-todo-detail">
                <button class="calendar-add-button">
                    <i class="fa-regular fa-calendar-check"></i>
                </button>
                <button class="delete-button">삭제</button>
                </div>
                </li>
            `;
        });
        TodoEvent.getInstance().addEventDeleteTodoClilck();
    }
}