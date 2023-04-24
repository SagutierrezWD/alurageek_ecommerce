import { modalService } from "../services/modal-service.js";


//====================================================== Configuracion básica========================================================
//Haciendo funcionar el menú desplegable
let menuIcon = document.getElementById("menu-icon");
menuIcon.onclick = () => {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}


// Preparando modal
window.onload = () => {
    modalService.modalStart();
}; 


// Boton del login para abrir modal
let loginbtn = document.getElementById("btn-login");
loginbtn.onclick = modalService.modalLogin;