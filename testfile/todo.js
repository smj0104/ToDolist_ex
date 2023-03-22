let count = 0;

class TodoEvent {
    static #instance = null;
    static count = null;
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

        // addEventDeleteDone() {
    //     const deleteDoneButton = document.querySelector(".button-delete-list");
    //     deleteDoneButton.onclick = () => {
    //         count = 0;
    //         TodoService.getInstance().updateLocalStorage();
    //         const counter = document.getElementById("count-numbers");
    //         counter.innerHTML = count;
    //       }
        
    // }

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
                TodoService.getInstance().updateLocalStorage();
                counter.innerHTML = count;
                console.log(index);
            }
        });
    }



    addEventOpenClick() {
        const modalOpenButtons = document.querySelectorAll(".list-modify-button");
        modalOpenButtons.forEach((modalOpenButton, index) => {
            modalOpenButton.onclick = () => {
                ModalService.getInstance().showModal(index);
            }
        });
    }

    
    addEventModifyTodoClick() {
        const modifyButtons = document.querySelectorAll(".list-modify-button")
        modifyButtons.forEach((modifyButton, index) => {
            modifyButton.onclick = () => {
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
        if (localStorage.getItem("todoList") == null) {
          this.todoList = new Array();
          count = 0;
        } else {
          this.todoList = JSON.parse(localStorage.getItem("todoList"));
          count = JSON.parse(localStorage.getItem("count"));
        }
        
        if (count === null) {
          count = 0;
        }
      
        this.loadTodoList();
        this.loadCounter();
      }
      

    updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        localStorage.setItem("count", JSON.stringify(count));
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
        this.todoList.splice(todoObj, index);
        this.updateLocalStorage();
    }

    loadTodoList() {
        const todoContentList = document.querySelector(".jobs-todo");
        todoContentList.innerHTML = ``;

        this.todoList.forEach(todoObj => {
            todoContentList.innerHTML += `
                <li class="jobs-todo-content">
                ${todoObj.todoContent}
                <div class="buttons">
                <button class="delete-button">
                <i class="fa-solid fa-trash-can"></i>
                </button>
                <button type="button" class="list-modify-button">
                <i class="fa-solid fa-pen-nib"></i>
                </button>
                </div>
                </li>
            `;
        });
        TodoEvent.getInstance().addEventModifyTodoClick();
        TodoEvent.getInstance().addEventDeleteTodoClilck();
        TodoEvent.getInstance().addEventOpenClick();

    }
    loadCounter() {
        const counter = document.getElementById("count-numbers");
        counter.innerHTML = count;
    }

    
}