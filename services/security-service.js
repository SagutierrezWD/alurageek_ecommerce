import { cookieService } from "./cookie-service.js";
import { modalService } from "./modal-service.js";

//URL base
const url = "http://localhost:3000/";
const controller = "usuarios";
const userId = cookieService.getCookie("ag_user_id");

const verificarSesionDeCuenta = async (incluirVerificacionDeRol) => {
    const data = await fetch(url+controller+"?id="+userId).then((response) => response.json()).catch(err => console.error(err))

    if(data[0] === undefined && userId == undefined ){
        //Ninguna cuenta ha iniciado sesion
        // console.log("Cuenta no ingresada")

        // Boton del login para abrir modal
        let btnLogin = document.createElement("button");
        btnLogin.classList.add("btn", "btn1");
        btnLogin.id = "btn-login";
        btnLogin.textContent = "Login";
        btnLogin.onclick = modalService.modalLogin;

        //Agregando boton de login
        let menuActions = document.querySelector(".menu-actions");
        menuActions.appendChild(btnLogin);
    }else{
        if(data[0] !== undefined){
            //Cuenta ingresada que tiene una ID que si coincide con una cuenta registrada
            // console.log("Cuenta ingresada verificada")

            //Verificar si el usuario puede acceder o no a caracteristicas de administrador, solo si se requiere verificar
            // if(incluirVerificacionDeRol === true && data[0].rol === 1){
                // console.log("Rol de cuenta verificado, puede agregar y editar productos")
            // }

            //Controlar que si se requiere verificar el rol, la cuenta tenga ese rol, sino mandara alerta
            if(incluirVerificacionDeRol === true && data[0].rol !== 1)
            {
                // console.log("Esta cuenta no puede acceder a las caracteristicas de admin")
            }
        }else{
            //Cuenta que inicio sesion tiene una ID no identificada
            // console.log("Cuenta ingresada no verificada")
            cerrarSesion("La cuenta tiene una ID no identificada, vuelva a iniciar sesion")
        }
    }
}

const cerrarSesion = (mensaje) => {
    if(mensaje !== "" || mensaje !== null || mensaje !== undefined){
        alert(mensaje)
    }

    cookieService.deleteCookie("ag_user_id");
    cookieService.deleteCookie("ag_user_id");

    cookieService.deleteCookie("ag_carrito_productos");

    window.location = "index.html"
}

//Este método verifica si la id indicada
const verificarId = () => fetch(url+controller+"?id="+userId).then(response => response.json()).catch(err => console.error(err));


export const securityService = {
    verificarSesionDeCuenta,
    verificarId,
    cerrarSesion
}