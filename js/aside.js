class AsideEvent{
    static #instance;
    static getInstace(){
        if(this.#instance==null){
            this.#instance = new AsideEvent();
        }
        return this.#instance;
    }

    addEventMenuButton(){
        const menuButton = document.querySelector(".menu-button");
        menuButton.onclick = () =>{
            const menuAside = document.querySelector(".menu-aside");
            if(menuAside.classList.contains("menu-hidden")){
                menuAside.classList.remove("menu-hidden")
            }else{
                menuAside.classList.add("menu-hidden");
            }
        }
    }
}