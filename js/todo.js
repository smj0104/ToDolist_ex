


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
        // const label = document.querySelector(".calendar-choice");
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

    addEventCalendarClilck(){
        const calendarButton = document.querySelectorAll(".calendar-add-button");
        const label = document.querySelector(".calendar-choice");
        calendarButton.forEach((Button,index)=>{
            Button.onclick = () =>{
                const todoObj = TodoService.getInstance().todoList;
                const keyDate = label.textContent;
                const valueDate = todoObj[index].todoContent;
                TodoService.getInstance().createCalendarList(keyDate,valueDate);
            }
        }) 

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
    calenderList = null;
    constructor() {
        const label = document.querySelector(".calendar-choice")
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
            todoContent: todoInput.value
        }

        this.todoList.push(todoObj);
        this.updateLocalStorage();
        this.loadTodoList();
    }

    updateCalendarLocalStorage(keyDate){
        localStorage.setItem(keyDate,JSON.stringify(this.calenderList));
    }

    addCalendar(keyDate,valueDate){
        const calendarObj = {
            Content: valueDate
        }
        console.log(calendarObj);
        this.calenderList.push(calendarObj);
        this.updateCalendarLocalStorage(keyDate);
    }

    createCalendarList(keyDate,valueDate){
        if(localStorage.getItem(keyDate) == null){
            this.calenderList = new Array();
        }else{
            this.calenderList = JSON.parse(localStorage.getItem(keyDate));
        }
        this.addCalendar(keyDate,valueDate);
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
        TodoEvent.getInstance().addEventCalendarClilck();
    }
}