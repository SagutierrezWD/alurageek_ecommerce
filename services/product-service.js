//URL base
const url = "http://localhost:3000/";
const controller = "productos";


const ListaProductos = () => fetch(url+controller).then((response) => response.json()).catch((err) => console.log(err));


export const productService = {
    ListaProductos,
}