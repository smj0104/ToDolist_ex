window.onload = () => {
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventDeleteTodoClilck();
    TodoService.getInstance();
}