window.onload = () => {
    TodoService.getInstance();
    ModalCanlendar.getInstance();
    TodoEvent.getInstance().addEventAddTodoClick();
    TodoEvent.getInstance().addEventAddTodoKeyUp();
    TodoEvent.getInstance().addEventDeleteTodoClilck();
    ModalCalendarEvent.getInstance().addEventCalendarButton();
    ModalCalendarEvent.getInstance().addEventCancelClick();
    AsideEvent.getInstace().addEventMenuButton();
    ModalEvent.getInstance().addEventCancelClick();
    ModalEvent.getInstance().addEventModifyOkClick();
}