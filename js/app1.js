window.onload = () => {
    TodoService.getInstance();
    ModalCanlendar.getInstance();
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    ModalEvent.getInstance().addEventCalendarButton();
    ModalEvent.getInstance().addEventCancelClick();
    AsideEvent.getInstace().addEventMenuButton();
}