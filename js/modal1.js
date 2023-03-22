class ModalCanlendar{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalCanlendar();
        }
        return this.#instance;
    }

    constructor() {
        this.displayDate = new Date();
        this.renderCalendar();
        this.addEventListeners();
    }

    addEventListeners() {
        const prevButton = document.querySelector('.modal-calendar-prev');
        const nextButton = document.querySelector('.modal-calendar-next');

        prevButton.onclick = () => {
            this.displayDate.setMonth(this.displayDate.getMonth() - 1);
            this.renderCalendar();
        }

        nextButton.onclick = () => {
            this.displayDate.setMonth(this.displayDate.getMonth() + 1);
            this.renderCalendar();
        };
    }

    renderCalendar() {
        const monthYear = document.querySelector('.modal-calendar-month-year');
        const calendarTable = document.querySelector('.modal-calendar-table tbody');
        calendarTable.innerHTML = '';

        const firstDayOfMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), 1);
        const lastDayOfMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0);

        let currentDay = new Date(firstDayOfMonth);

        monthYear.innerHTML = `
            <span class="modal-calendar-year">${this.displayDate.getFullYear() + '년'}</span>
            <span class="modal-calendar-month">${this.getMonthName(this.displayDate.getMonth())}</span>
        `;

        while (currentDay <= lastDayOfMonth) {
            const weekRow = document.createElement('tr');

            for (let i = 0; i < 7; i++) {
                const dayCell = document.createElement('td');
                dayCell.classList.add("modal-calendar-day");

                if ((i === currentDay.getDay()) && (currentDay <= lastDayOfMonth)) {
                    dayCell.textContent = currentDay.getDate();
                    currentDay.setDate(currentDay.getDate() + 1);
                    dayCell.onclick = () => {
                        const year = this.displayDate.getFullYear();
                        const month = this.displayDate.getMonth() + 1;
                        const day = parseInt(dayCell.textContent);
                        this.getToday(year,month,day);
                        ModalService.getInstance().closeModal();
                    }
                }
                weekRow.appendChild(dayCell);
            }
            calendarTable.appendChild(weekRow);
        }
        ModalEvent.getInstance().addEventCalendarButton();
    }

    getMonthName(month) {
        const monthNames = [
            '1월', '2월', '3월', '4월', '5월', '6월',
            '7월', '8월', '9월', '10월', '11월', '12월'
        ];

        return monthNames[month];
    }

    getToday(year,month,day) {
        const text = document.querySelector(".calendar-choice");
        console.log(text);
        text.innerHTML = `${year}년 ${month}월 ${day}일`;
    }
}

class ModalEvent{
    static #instace = null;
    static getInstance() {
        if(this.#instace == null){
            this.#instace = new ModalEvent();
        }
        return this.#instace;
    }

    addEventCancelClick(){
        const modalCancelButton = document.querySelector(".modal-calendar-close");
        modalCancelButton.onclick = () =>{
            ModalService.getInstance().closeModal();
        }
    }

    addEventCalendarButton(){
        const modalCalendarButton = document.querySelector(".menu-calendar-button");
        console.log(modalCalendarButton);
        modalCalendarButton.onclick = () =>{
            ModalService.getInstance().showModal();
        }
    }
}

class ModalService{
    static #instace = null;
    static getInstance() {
        if(this.#instace == null){
            this.#instace = new ModalService();
        }
        return this.#instace;
    }

    showModal(){
        const modalContainer = document.querySelector(".modal-calendar-container");
        modalContainer.classList.remove("modal-hidden");
    }

    closeModal(){
        const modalContainer = document.querySelector(".modal-calendar-container");
        modalContainer.classList.add("modal-hidden");
    }
}