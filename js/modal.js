class ModalEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalEvent();
        }
        return this.#instance;
    }

    addEventCancelClick() {
        const modalCancelButton = document.querySelector(".modal-cancel-button");
        modalCancelButton.onclick = () => {
            ModalService.getInstance().closeModal();    
        }
    }
    
    addEventModifyOkClick(modifyIndex) {
        const modalModifyButton = document.querySelector(".modal-modify-button");
        modalModifyButton.onclick = () => {
            const todoModifyInput = document.querySelector(".todo-modify-input");
            TodoService.getInstance().todoList[modifyIndex].todoContent = todoModifyInput.value;
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();

        }
    }
}

class ModalService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalService();
        }
        return this.#instance;
    }

    showModal() {
        const showContainer = document.querySelector(".modal-container");
        showContainer.classList.remove("modal-hidden");
    }

    closeModal() {
        const showContainer = document.querySelector(".modal-container");
        showContainer.classList.add("modal-hidden");
    }

    modifyModal(modifyIndex) {
        const todoObj = TodoService.getInstance().todoList[modifyIndex];
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
        <div class="modal-header">
                <h1 class="modal-title">내용 수정</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">내용을 수정해주세요.</p>
                <input type="text" class="todo-modify-input" value="${todoObj.todoContent}">
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-modify-button">
                수정
                </button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        ModalEvent.getInstance().addEventModifyOkClick(modifyIndex);
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();
    }


}