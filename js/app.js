window.onload = () => {
    TodoService.getInstance();
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventDeleteTodoClilck();
    TodoEvent.getInstance().addEventDeleteDone();
    TodoEvent.getInstance().addEventOpenClick();
    TodoEvent.getInstance().addEventModifyTodoClick();
    ModalEvent.getInstance().addEventCancelClick();
    ModalEvent.getInstance().addEventModifyOkClick();

}