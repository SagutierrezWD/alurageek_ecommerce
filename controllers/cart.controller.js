import { modalService } from "../services/modal-service.js";
import { securityService } from "../services/security-service.js";


//====================================================== Configuracion básica========================================================
//Haciendo funcionar el menú desplegable
let menuIcon = document.getElementById("menu-icon");
menuIcon.onclick = () => {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}


window.onload = () => {
    //Verificando cuenta
    securityService.verificarSesionDeCuenta();

    // Preparando modal
    modalService.modalStart();
}; 

