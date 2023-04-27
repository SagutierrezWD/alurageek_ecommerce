import { cookieService } from "./cookie-service.js";


const agregarAlCarrito = async (id) => {
    //Obtener los productos ya agregados al carrito, si los hay
    let productosEnCarrito = cookieService.getCookie("ag_carrito_productos");
        
    let productoLista;//Esta variable almacenara el listado de productos
    
    //Verificar si hay o no productos en el carrito
    if(productosEnCarrito == null && typeof(productosEnCarrito) !== String){
        productoLista = id;
    }else{
        productoLista = productosEnCarrito.split(",")
        
        //Verificando si el producto ya esta agregado
        if(productoLista.includes(id) == true){
            return alert("Este producto ya esta agregado en tu carrito")
        }
        
        //Volviendo a unir el listado de productos en un string para luego agregar el id
        productoLista = productoLista.join(",");
        productoLista = productoLista+","+id;
    }
    
    //Agregando productos al carrito
    cookieService.setCookie("ag_carrito_productos", productoLista, 365);
    alert("Producto agregado!")
}

export const cartService = {
    agregarAlCarrito,
}