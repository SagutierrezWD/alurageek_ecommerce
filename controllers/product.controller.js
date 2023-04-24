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


// Simulando productos cargando, método solo temporal y de prueba
let productList = document.getElementById("products");
setTimeout(() => {
    productList.innerHTML = `<div class="card-list">
    <div class="card">
        <h3 class="card-title">Producto 1</h3>

        <img src="assets/image/asus.jpg" alt="" class="card-image">

        <div class="card-pricing">
            <span class="price-disc">$5.200.000</span>
            <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
        </div>
        
        <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
    </div>

    <div class="card">
        <h3 class="card-title">Producto 2</h3>

        <img src="assets/image/asus.jpg" alt="" class="card-image">

        <div class="card-pricing">
            <span class="price-disc">$5.200.000</span>
            <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
        </div>
        
        <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
    </div>

    <div class="card">
        <h3 class="card-title">Producto 3</h3>

        <img src="assets/image/asus.jpg" alt="" class="card-image">

        <div class="card-pricing">
            <span class="price-disc">$5.200.000</span>
            <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
        </div>
        
        <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
    </div>

    <div class="card">
        <h3 class="card-title">Producto 4</h3>

        <img src="assets/image/asus.jpg" alt="" class="card-image">

        <div class="card-pricing">
            <span class="price-disc">$5.200.000</span>
            <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
        </div>
        
        <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
    </div>
</div>`
}, 2000);
