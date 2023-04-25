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
    modalService.modalStart();
}; 


// Boton del login para abrir modal
let loginbtn = document.getElementById("btn-login");
loginbtn.onclick = modalService.modalLogin;


//====================================================== Logica del controlador ========================================================
window.onload = async () => {
    ProductoSeleccionado();
}

const ProductoSeleccionado = async () => {
    //Obteniendo ID de la URL
    let url = new URL(window.location);
    let id = url.searchParams.get("id");

    let productos = await productService.ListaProductos();

    let productoSel = productos.find(producto => producto.id == id);
    
    
    //Valores que se pintaran en el card, solo son algunos del total de datos que se pintaran
    let descontado = "";
    let precio = formatPrice(productoSel.precio);
    let precioAnterior = 0;
    let descuento = "";
    
    if(productoSel.descuento > 0 && productoSel.descuento < 99){
        precioAnterior = formatPrice(productoSel.precio);
        descontado = (productoSel.precio * productoSel.descuento) / 100;
        precio = formatPrice(productoSel.precio - descontado);
        descuento = productoSel.descuento + "% OFF";     
    }else{
        precioAnterior = "";
    }
    
    let productHTML = `<div class="product-img">
    <img src="assets/image/asus.jpg" alt="">
    </div>
    <div class="product-details">
                            <h2>${productoSel.nombre}</h2>
                            
                            <div class="product-desc">
                                <p>${productoSel.descripcion}</p>
                                
                                <div class="product-pricing">
                                    <span class="price-disc">${precioAnterior}</span>
                                    <span class="price">${precio} <span class="disc-per">${descuento}</span></span>
                                    </div>
                                    
                                    <div class="button-actions">
                                    <a class="btn-link btn btn1" href="">Comprar</a>
                                    <a class="btn-link btn btn2" href="">Añadir al carrito</a>
                                    </div>
                                    </div>
                                    
                                    <div class="icon-info">
                                    <div class="icon">
                                    <i class="bx bx-car"></i>
                                    <span>Envio gratis</span>
                                </div>
                                <div class="icon">
                                    <i class="bx bx-package"></i>
                                    <span>Reembolso en 30 días</span>
                                </div>
                                </div>
                                </div>`;
                                
    let productInfo = document.getElementById("product-info");
    productInfo.removeChild(document.getElementById("load-image"));
    productInfo.innerHTML = productHTML;

    //Para pintar la seccion 'Tambien te puede interesar' de la pagina de detalles del producto
    ProductosExtra(productos, productoSel.tipo);
}

const ProductosExtra =  (productos, tipoSel) => {

    for (let index = 0; index < productos.length; index++) {
        if(productos[index].tipo !== tipoSel){
            continue
        }

        const producto = productos[index];

        //Valores que se pintaran en el card, solo son algunos del total de datos que se pintaran
        let descontado = "";
        let precio = formatPrice(producto.precio);
        let precioAnterior = 0;
        let descuento = "";
        
        if(producto.descuento > 0 && producto.descuento < 99){
            precioAnterior = formatPrice(producto.precio);
            descontado = (producto.precio * producto.descuento) / 100;
            precio = formatPrice(producto.precio - descontado);
            descuento = producto.descuento + "% OFF";     
        }else{
            precioAnterior = "";
        }
        
        let card = `<div class="card">
                        <h3 class="card-title">${producto.nombre}</h3>

                        <img src="assets/image/${producto.imagen}" alt="Imagen del producto: ${producto.nombre}" class="card-image">

                        <div class="card-pricing">
                            <span class="price-disc">${precioAnterior}</span>
                            <span class="price">${precio} <span class="disc-per">${descuento}</span></span>
                        </div>
                        
                        <a class="btn btn2 btn-link" href="producto.html">Ver más</a>
                    </div>`

        let cardList = document.getElementById("card-list");
        cardList.innerHTML = cardList.innerHTML + card;
    }
    
    //Eliminar imagen de carga 
    let also = document.getElementById("also");
    also.removeChild(document.getElementById("load-image"));
}