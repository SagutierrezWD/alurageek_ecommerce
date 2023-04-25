import { formatPrice } from "../services/formatPrice-service.js";
import { modalService } from "../services/modal-service.js";
import { productService } from "../services/product-service.js";


//====================================================== Configuracion básica ========================================================
//Haciendo funcionar el menú desplegable
let menuIcon = document.getElementById("menu-icon");
menuIcon.onclick = () => {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}


// Preparando modal
window.onload = () => {
    console.log("Si")
    modalService.modalStart();
    ObtenerProductos();
}; 


// Boton del login para abrir modal
let loginbtn = document.getElementById("btn-login");
loginbtn.onclick = modalService.modalLogin;


//====================================================== Logica del controlador ========================================================
    const ObtenerProductos = async () => {
    let productos = await productService.ListaProductos();

    let cardList = document.createElement("div");
    cardList.classList.add("card-list");
    cardList.id = "card-list";

    for (let index = 0; index < productos.length; index++) {
        const producto = productos[index];

        //Valores que se pintaran en el card, solo son algunos del total de datos que se pintaran
        let descontado = 0;
        let precio = formatPrice(producto.precio);
        let precioAnterior = 0;
        let descuento = "";

        let productoSinDescuento = "price-centered" //Esto es para aplicar un estilo en cierto caso

        if(producto.descuento > 0 && producto.descuento < 99){
            precioAnterior = formatPrice(producto.precio);
            descontado = (producto.precio * producto.descuento) / 100;
            precio = formatPrice(producto.precio - descontado);
            descuento = producto.descuento + "% OFF";
            productoSinDescuento = "";        
        }else{
            precioAnterior = "";
        }

        let productHTML = `<div class="card">
                                <h3 class="card-title">${producto.nombre}</h3>

                                <img src="assets/image/${producto.imagen}" alt="Imagen del equipo: ${producto.nombre}" class="card-image">

                                <div class="card-pricing ${productoSinDescuento}">
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
