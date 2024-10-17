//Bienvenida
function capturarNombreUsuario(){
    Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText: 'Enviar',
    }).then((result) => {
        if(result.value){
            sessionStorage.setItem('nombreUsuario', result.value);
            actualizarNombreCarrito();
        }
    })
}

//Agregar nombre al carrito
function actualizarNombreCarrito(){
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    if(nombreUsuario){
        const nombreUsuarioCarrito = document.getElementById('nombreUsuario-carrito');
        nonombreUsuarioCarrito.textContent = 'Hola ' + nombreUsuario;
    }
}


import { mostrarProductos } from "./products.js";

let carrito = [];
let total = 0;


let productosMap = {};
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        const productos = await response.json();

        productos.forEach(producto => {
            productosMap[producto.id] = producto;
        });

        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

//Agregar productos al carrito
function eventoAgregarCarrito(idProducto) {
    const btnAgregar = document.querySelectorAll('.agregar-carrito');
    btnAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = e.target.getAttribute('data-id');
            agregarAlCarrito(parseInt(idProducto));
        });
    });
}

function agregarAlCarrito(idProducto){
    const producto = productosMap[idProducto];
    const cantidadInput = document.getElementById(`cantidad-${producto.id}`);
    const cantidad = parseInt(cantidadInput.value);

    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if(productoEnCarrito){
        if(productoEnCarrito.cantidad < producto.stock){
            productoEnCarrito.cantidad++;
        } else{
        Swal.fire({
            icon: 'warning',
            title: 'Stock máximo alcanzado',
            text: `No puedes agregar más de ${producto.stock} unidades`
        });
        return;
    };
    } else{
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    };
    
    actualizarCarrito();
    toastAgregado();
};



function toastAgregado() {
    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Producto agregado al carrito',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}


function actualizarCarrito(){

    const listCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    total = 0;

    listaCarrito.innerHTML = '';

    if(carrito.length === 0){
        let item = document.createElement('li');
        item.innerHTML = "Tu carrito esta vacío";
        item.classList.add('carrito-vacio');

        listaCarrito.appendChild(item);
    }else{
        carrito.forEach(producto => {
            
            const itemProducto = `
                <h5>${producto.nombre}</h5>
                <span>Cantidad: ${producto.cantidad}</span>
                <span>Precio: $${producto.precio * producto.cantidad}</span>
                <button class="btn btn-danger btn-sm eliminar-producto" data-id="${producto.id}">Quitar productos</button>
                `;
        
        listaCarrito.innerHTML += itemProducto;
        total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `Total $${total}`;
    };

    localStorage.setItem('carrito', JSON.stringify(carrito));

    eventoEliminarCarrito()
}


function eventoEliminarCarrito(){
    const btnEliminar = document.querySelectorAll('.eliminar-producto');

    btnEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = e.target.getAttribute('data-id');
            eliminarDelCarrito(parseInt(idProducto));
        });
    });
};


function eliminarDelCarrito(idProducto){
    carrito = carrito.filter(producto => producto.id !== idProducto);

    actualizarCarrito();

    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Producto eliminado del carrito',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })

}


document.addEventListener('DOMContentLoaded', () => {
    capturarNombreUsuario();
    
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoStorage) {
        carrito = carritoStorage;
        actualizarCarrito();
    }
    cargarProductos();
    actualizarNombreCarrito();
});




// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// const cartContainer = document.getElementById('lista-carrito')


// function showCart(){

//     //const cartContainer = document.getElementById('lista-carrito')
//     cartContainer.innerHTML = '';


//     carrito.forEach((product, index) => {
//         const {name, price, quantity} = product;
//         const item = document.createElement('li');
        
//         item.innerHTML = `
//         <h5 class='cart-product-title'>${name}</h5>
//         <p class='cart-product-price'>Precio: ${price}</p>
//         <span>Cantidad: ${quantity}</span>
//         `;

//         cartContainer.appendChild(item)
//     })

//     calcTotal();
// }




// function agregarAlCarrito(event){
//     const boton = event.target;
//     const productCard = boton.closest('.card');
//     const productName = productCard.querySelector('.card-title').textContent;
//     const productPrice = productCard.querySelector('.producto-precio');

//     const productQuantity = productCard.querySelector('.cantidad-input').value;


//     const product = {
//         nanme: productName,
//         price: productPrice,
//         quantity: productQuantity,
//     }

//     carrito.push(product);

//     alLocalStorage();
//     showCart();
// }


// document.addEventListener('DOMContentLoaded', function(){

//     const botonesAgregar = document.querySelectorAll(".agregar-carrito");
    
//     botonesAgregar.forEach((boton) => {
//         boton.addEventListener("click", agregarAlCarrito);
//     });

//     //const cartContainer = document.getElementById('lista-carrito');
//     cartContainer.addEventListener('click', quitarProducto);
//     cartContainer.addEventListener('click', (event) =>{
        
//         /* if (event.target.classList.contains('cantidad-input')) {
//             const index = Number (event.target.dataset.index);
//             carrito[index].productQuantity++;
//             alLocalStorage();
//             showCart();
//         } */
//     });


//     function deleteCarrito(event){
//         if (event.target.classList.contains('vaciar-carrito')){
//             const index = Number(event.target.dataset.index);
//             carrito.splice(index, 1);
//             alLocalStorage();
//             showCart();
//         }
//     }

        
// });


// function alLocalStorage(){
//     localStorage.setItem('carrito', JSON.stringify(carrito));
// }






/* let div = document.createElement('div');


let firstForm = document.createElement('form')
firstForm.id = "formContainer",
firstForm.innerHTML = `<input type="text" id="inputNombre" name="Nombre">
                        <input type="submit" id="firstBtn" value="Enviar">`;



let producDisplay = document.getElementById('productos')
producDisplay.appendChild(firstForm);


let inputNombre = document.getElementById("inputNombre");
let btn = document.getElementById('firstBtn');

let nombreDisplay = div
nombreDisplay.className = 'nombreDisplay';

btn.addEventListener("click", () => {    
    sessionStorage.setItem('nombre', inputNombre.value);
    let nombreUsuario = sessionStorage.getItem('nombre')

    if((nombreUsuario == '')||(nombreUsuario == null)){
        let errorMsg = document.createElement('h1')
        errorMsg.innerHTML = 'Por favor ingresar un valor'
        document.body.appendChild(errorMsg)
    }else{
        document.getElementById('formContainer').remove();
        nombreDisplay.innerHTML = `<h1>Bienvenido ${nombreUsuario}!</h1>`;
        document.body.appendChild(nombreDisplay)
        listaProductos()
    }
}); */