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
    modalService.modalStart();
}; 


// Boton del login para abrir modal
let loginbtn = document.getElementById("btn-login");
loginbtn.onclick = modalService.modalLogin;


//====================================================== Logica del controlador ========================================================
window.onload = async () => {
    let productos = await productService.ListaProductos();
    console.log(productos)

    let cardList = document.createElement("div");
    cardList.classList.add("card-list");
    cardList.id = "card-list";

    for (let index = 0; index < productos.length; index++) {
        const producto = productos[index];

        //Formato de la moneda actual (COP)
        let formato = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })

        //Valores que se pintaran en el card, solo son algunos del total de datos que se pintaran
        let descontado = 0;
        let precio = formato.format(producto.precio);
        let precioAnterior = 0;
        let descuento = "";
        let productoSinDescuento = "price-centered"

        if(producto.descuento > 0 && producto.descuento < 99){
            precioAnterior = formato.format(producto.precio);
            descontado = (producto.precio * producto.descuento) / 100;
            precio = formato.format(producto.precio - descontado);
            console.log("descuento")
            descuento = producto.descuento + "% OFF";
            productoSinDescuento = "";        
        }else{
            precioAnterior = "";
        }

        console.log(precio);

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

    let productList = document.getElementById("products");
    productList.removeChild(document.getElementById("load-image"));
    console.log(cardList)
    productList.appendChild(cardList);
}


// Simulando productos cargando, método solo temporal y de prueba
// let productList = document.getElementById("products");
// setTimeout(() => {
//     productList.innerHTML = `<div class="card-list">
//     <div class="card">
//         <h3 class="card-title">Producto 1</h3>

//         <img src="assets/image/asus.jpg" alt="" class="card-image">

//         <div class="card-pricing">
//             <span class="price-disc">$5.200.000</span>
//             <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
//         </div>
        
//         <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
//     </div>

//     <div class="card">
//         <h3 class="card-title">Producto 2</h3>

//         <img src="assets/image/asus.jpg" alt="" class="card-image">

//         <div class="card-pricing">
//             <span class="price-disc">$5.200.000</span>
//             <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
//         </div>
        
//         <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
//     </div>

//     <div class="card">
//         <h3 class="card-title">Producto 3</h3>

//         <img src="assets/image/asus.jpg" alt="" class="card-image">

//         <div class="card-pricing">
//             <span class="price-disc">$5.200.000</span>
//             <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
//         </div>
        
//         <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
//     </div>

//     <div class="card">
//         <h3 class="card-title">Producto 4</h3>

//         <img src="assets/image/asus.jpg" alt="" class="card-image">

//         <div class="card-pricing">
//             <span class="price-disc">$5.200.000</span>
//             <span class="price">$3.500.000 <span class="disc-per">15% OFF</span></span>
//         </div>
        
//         <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
//     </div>
// </div>`
// }, 2000);
