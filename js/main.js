function capturarNombreUsuario() {
    Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonText: 'Enviar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar tu nombre!'; 
            }
        }
    }).then((result) => {
        if (result.value) {
            const nombreFormateado = result.value
                .toLowerCase()
                .replace(/^(.)/, (match) => match.toUpperCase());
            
            sessionStorage.setItem('nombreUsuario', nombreFormateado);
            actualizarNombreCarrito();
        }
    });
}




function actualizarNombreCarrito(){
    const nombreUsuario = sessionStorage.getItem('nombreUsuario');
    if(nombreUsuario){
        const nonombreUsuarioCarrito = document.getElementById('nombreUsuario-carrito');
        nonombreUsuarioCarrito.textContent = 'Hola ' + nombreUsuario + ',';
    }
}


import { mostrarProductos } from "./products.js";

let carrito = [];
let total = 0;


let productosMap = {};
async function cargarProductos() {
    try {
        const response = await fetch('database/productos.json');
        const productos = await response.json();

        productos.forEach(producto => {
            productosMap[producto.id] = producto;
        });

        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}


export function eventoAgregarCarrito() {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = e.target.dataset.id;
            const cantidadInput = document.getElementById(`cantidad-${idProducto}`);
            const cantidad = parseInt(cantidadInput.value);
            agregarAlCarrito(parseInt(idProducto), cantidad);
        });
    });
}


function agregarAlCarrito(idProducto, cantidad){
    const producto = productosMap[idProducto];
    const productoEnCarrito = carrito.find(item => item.id === idProducto);

    if(productoEnCarrito){
        if(productoEnCarrito.cantidad + cantidad <= producto.stock){
            productoEnCarrito.cantidad += cantidad;
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Stock máximo alcanzado',
                text: `No puedes agregar más de ${producto.stock} unidades`
            });
            return;
        }
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

    actualizarCarrito();
    toastAgregado();
}



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


function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    total = 0;

    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        let item = document.createElement('li');
        item.innerHTML = "Tu carrito está vacío";
        item.classList.add('carrito-vacio');
        listaCarrito.appendChild(item);
    } else {
        carrito.forEach(producto => {
            
            const itemProducto = document.createElement('li');
            itemProducto.innerHTML = `
                <div class="item-descripción">
                    <h5>${producto.nombre}</h5>
                    <span>Cantidad: ${producto.cantidad}</span>
                    <span>Precio: $${producto.precio * producto.cantidad}</span>
                </div>
                <button class="btn btn-danger btn-sm eliminar-producto" data-id="${producto.id}">
                     <i class="fas fa-trash"></i>
                </button>
            `;
            
            listaCarrito.appendChild(itemProducto);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `Total: $${total}`;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    eventoEliminarCarrito();
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




document.getElementById('confirmar-carrito').addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'No tenes productos en tu carrito.'
        });
    } else {
        
        Swal.fire({
            title: 'Finaliza tu compra',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${sessionStorage.getItem('nombreUsuario')}">
                <input id="email" class="swal2-input" placeholder="Mail">
                <input id="tarjeta" class="swal2-input" placeholder="Últimos 4 dígitos de tu tarjeta" maxlength="4" type="text">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const tarjeta = document.getElementById('tarjeta').value;

                
                if (!nombre || !email || !tarjeta) {
                    Swal.showValidationMessage('Por favor, completa todos los campos');
                    return false;
                }

                
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    Swal.showValidationMessage('Ingresa un mail válido');
                    return false;
                }

                
                if (tarjeta.length !== 4 || isNaN(tarjeta)) {
                    Swal.showValidationMessage('Ingresar un mínimo de 4 números');
                    return false;
                }

                return { nombre, email, tarjeta };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre } = result.value;

                
                mostrarMensajeAgradecimiento(nombre);
            }
        });
    }
});


function mostrarMensajeAgradecimiento(nombre) {
    
    document.getElementById('productsSection').classList.add('ocultar');
    document.getElementById('carrito').classList.add('ocultar');
    
    
    carrito = [];
    actualizarCarrito();

    
    const mensaje = document.createElement('div');
    mensaje.classList.add("msj-despedida")
    mensaje.innerHTML = `
        <h1>Gracias, ${nombre}, por tu compra!</h1>
        <p>Tu pedido ha sido procesado con éxito.</p>
    
    `;
    document.querySelector('main').appendChild(mensaje);
}
