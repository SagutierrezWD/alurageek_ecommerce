import { loginService } from "./login-service.js";

// Funcion para preparar modal
const modalStart = () => {
    // Obteniendo el body
    let body = document.getElementsByTagName("body");

    //Creando divisiones
    let modalContainer = document.createElement("div");
    let modalContent = document.createElement("div");

    //Asignando clases
    modalContainer.classList.add("container-modal");
    modalContent.classList.add("content-modal");

    //Asignando ID
    modalContainer.id = "modal-container";
    modalContent.id = "modal-body";

    //Uniendo divisiones
    modalContainer.appendChild(modalContent);

    // Agregando modal al body
    body[0].appendChild(modalContainer);
}


// Funciones para abrir diferentes modals
const modalLogin = (e) => {
    e.preventDefault();
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<form action="" id="formLogin">
                                <div class="form-head">
                                    <h2>Iniciar sesion</h2>
                                    <span class="close-icon" id="btn-close"><i class="bx bx-x"></i></span>
                                </div>
                                
                                <div class="form-control">
                                    <label for="usuario">Usuario</label>
                                    <input class="form-control" type="text" name="usuario" id="usuario" required>
                                </div>
                                
                                <div class="form-control">
                                    <label for="contraseña">Contraseña</label>
                                    <input class="form-control" type="password" name="contraseña" id="contraseña" required>
                                </div>
                                
                                <div class="btn-cerrar">
                                    <button type="submit" class="btn btn-modal">Ingresar</button> 
                                </div>
                            </form>`

    modalToggle();

    
    // Agregando método para el formulario del login
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const data = await loginService.iniciarSesion(document.querySelector("#usuario").value)

        let userFinded = false;

        for (let index = 0; index < data.length; index++) {
            const usuario = data[index];
            if(document.querySelector("#contraseña").value == usuario.pass){
                userFinded = true;
                alert("Ha iniciado sesion");
                setCookie("ag_user_id", usuario.id, 365);
                setCookie("ag_user_role", usuario.rol, 365);
                window.location = "index.html"
                break
            }
        }

        if(userFinded == false)
        {
            alert("Usuario o contraseña incorrecto")
        }
        
    })
}

const modalProductAdd = (e) => {
    e.preventDefault();
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<form action="">
                            <div class="form-head">
                                <h2>Agregar producto</h2>
                                <span class="close-icon" id="btn-close"><i class="bx bx-x"></i></span>
                            </div>
                            
                            <div class="form-control">
                                <label for="nombre">Nombre</label>
                                <input class="form-control" type="text" name="nombre" id="nombre" required>
                            </div>
                            
                            <div class="form-control">
                                <label for="categoria">Categoria</label>
                                <input class="form-control" type="text" name="categoria" id="categoria" required>
                            </div>

                            <div class="form-control">
                                <label for="urlimagen">URL de imagen</label>
                                <input class="form-control" type="text" name="urlimagen" id="urlimagen" required>
                            </div>

                            <div class="form-control">
                                <label for="descripcion">Descripcion</label>
                                <textarea class="text-area" name="descripcion" id="descripcion" minlength="10" maxlength="600" required></textarea>
                            </div>
                            
                            <div class="btn-cerrar">
                                <button type="submit" class="btn btn-modal">Ingresar</button>
                            </div>
                        </form>`

    modalToggle();
}

const modalProductEdit = (id, e) => {
    e.preventDefault();
    let modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<form action="">
                                <div class="form-head">
                                    <h2>Agregar producto</h2>
                                    <span class="close-icon" id="btn-close"><i class="bx bx-x"></i></span>
                                </div>
                                
                                <div class="form-control">
                                    <label for="nombre">Nombre</label>
                                    <input class="form-control" type="text" name="nombre" id="nombre" required>
                                </div>
                                
                                <div class="form-control">
                                    <label for="categoria">Categoria</label>
                                    <input class="form-control" type="text" name="categoria" id="categoria" required>
                                </div>

                                <div class="form-control">
                                    <label for="urlimagen">URL de imagen</label>
                                    <input class="form-control" type="text" name="urlimagen" id="urlimagen" required>
                                </div>

                                <div class="form-control">
                                    <label for="descripcion">Descripcion</label>
                                    <textarea class="text-area" name="descripcion" id="descripcion" required></textarea>
                                </div>
                                
                                <div class="btn-cerrar">
                                    <button type="submit" class="btn btn-modal">Ingresar</button>
                                </div>
                            </form>`

    modalToggle();
}

// Funcion auxiliar, solo requerida por los métodos exportados acá
function modalToggle(){
    let closebtn = document.getElementById("btn-close");
    closebtn.onclick = modalLogin;
    let modal = document.getElementById("modal-container");
    modal.classList.toggle("toggle-modal");
}

function setCookie(name, value, daysToExpire){
    const date = new Date();
    date.setDate(date.getDate() + (daysToExpire * 24 * 60 * 60 * 1000))
    let expires = "expires="+date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/;`
}

function getCookie(name){
    const cookieDecode = decodeURIComponent(document.cookie);
    const cookieArray = cookieDecode.split("; ");
    let result = null;

    cookieArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 1)
        }
    })
    return result;
}

export const modalService = {
    modalStart,
    modalLogin,
    modalProductAdd,
    modalProductEdit
}