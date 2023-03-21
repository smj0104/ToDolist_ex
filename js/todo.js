let count = 0;

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
        addTodoButton.onclick = () => {
            TodoService.getInstance().addTodo();
            const todoInput = document.querySelector(".todo-input");
            todoInput.value = "";
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
        const counter = document.getElementById("count-numbers");
        
        
        deleteTodoButton.forEach((Button, index) => {
            Button.onclick = () => {
                TodoService.getInstance().todoList.splice(index,1);
                count++;
                counter.textContent = count;
                //TodoService.getInstance().addNumber();
                TodoService.getInstance().updateLocalStorage();
                console.log(index);
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
        if(localStorage.getItem("todoList") == null) {
            this.todoList = new Array();
        }else {
            this.todoList = JSON.parse(localStorage.getItem("todoList"));
            this.count = JSON.parse(localStorage.getItem("count"));
        }
        this.loadTodoList();
    }

    updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        localStorage.setItem("count", JSON.stringify(this.count));
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

    addNumber() {
        const numberInput = document.querySelector(".count-numbers");

        const todoObj = {
            todoContent: numberInput.value
        }

        this.count.push(todoObj);
        this.updateLocalStorage();
        this.loadTodoList();
    }

    deleteTodo() {
        const deleteInput = document.querySelector(".jobs-todo-content");

        const todoObj = {
            todoContent: deleteInput.value
        }
        this.todoList.splice(todoObj, index);
        this.updateLocalStorage();
    }

    loadTodoList() {
        const todoContentList = document.querySelector(".jobs-todo");
        todoContentList.innerHTML = ``;

        this.todoList.forEach(todoObj => {
            todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                ${todoObj.todoContent}<button class="delete-button">
                <i class="fa-solid fa-trash-can"></i>
                </button>
                </li>


            `;
        });
        TodoEvent.getInstance().addEventDeleteTodoClilck();
    }
}