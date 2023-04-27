import { cookieService } from "../services/cookie-service.js";
import { priceService } from "../services/formatPrice-service.js";
import { modalService } from "../services/modal-service.js";
import { productService } from "../services/product-service.js";
import { securityService } from "../services/security-service.js";


//====================================================== Configuracion básica ========================================================
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

    //Obteniendo productos
    ObtenerProductos();
    console.log(cookieService.getCookie("ag_carrito_productos"))
}; 

//====================================================== Logica del controlador ========================================================
const ObtenerProductos = async () => {
    let productos = await productService.ListaProductos();

    let cardList = document.createElement("div");
    cardList.classList.add("card-list");
    cardList.id = "card-list";

    for (let index = 0; index < productos.length; index++) {
        const producto = productos[index];

        let productPrice = priceService.priceValueManager(producto);

        let {precio, precioAnterior, descuento, estiloProductoSinDescuento} = productPrice;

        let productHTML = `<div class="card">
                                <h3 class="card-title">${producto.nombre}</h3>

                                <img src="assets/image/${producto.imagen}" alt="Imagen del equipo: ${producto.nombre}" class="card-image">

                                <div class="card-pricing ${estiloProductoSinDescuento}">
                                    <span class="price-disc">${precioAnterior}</span>
                                    <span class="price">${precio} <span class="disc-per">${descuento}</span></span>
                                </div>
                                
                                <a class="btn btn2 btn-link" href="producto.html?id=${producto.id}">Ver más</a>
                            </div>`;

        cardList.innerHTML = cardList.innerHTML + productHTML;
    }

    //Removiendo imagen de carga y agregando cards
    let productList = document.getElementById("products");
    productList.removeChild(document.getElementById("load-image"));
    productList.appendChild(cardList);
}