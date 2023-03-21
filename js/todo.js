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

    addEventDeleteTodoClilck(removeIndex) {
        const deleteTodoButton = document.querySelector(".delete-button");
        deleteTodoButton.onclick = () => {
            TodoService.getInstance().todoList.splice(removeIndex, 1);
            TodoService.getInstance().updateLocalStorage();       
        }
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

    deleteTodo() {
        const deleteInput = document.querySelector(".jobs-todo-content");

        const todoObj = {
            todoContent: deleteInput.value
        }
        this.todoList.splice(todoObj,1);
        this.updateLocalStorage();
    }


    loadTodoList() {
        const todoContentList = document.querySelector(".jobs-todo");
        todoContentList.innerHTML = ``;

        this.todoList.forEach(todoObj => {
            todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                ${todoObj.todoContent}<button class="delete-button">삭제</button>
                </li>


            `;
        });

        //TodoEvent.getInstance().addEventModifyTodoClick();
        //TodoEvent.getInstance().addEventRemoveTodoClick();
    }
}