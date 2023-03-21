window.onload = () => {
    TodoService.getInstance();
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventDeleteTodoClilck();
}