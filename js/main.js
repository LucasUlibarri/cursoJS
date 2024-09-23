let div = document.createElement('div');


let productos = [
    {
        id: 1,
        nombre: "Producto 1",
        precio: 200,
        descripcion: "Este producto es el modelo 1",
    },
    {
        id: 2,
        nombre: "Producto 2",
        precio: 400,
        descripcion: "Este producto es el modelo 2",
    },
    {
        id: 3,
        nombre: "Producto 3",
        precio: 600,
        descripcion: "Este producto es el modelo 3",
    }
]

function listaProductos(){
    for (const producto of productos){
        let card = document.createElement('div');
        card.className = 'cardProducto'
        card.innerHTML = `<h3 class="nombreProducto"> ${producto.nombre} </h3>
                            <p> ${producto.descripcion}</p>
                            <p class="precioProducto">$ ${producto.precio}</p>
                            <button class="btnCarrito">Agregar al carrito</button>`
        document.body.append(card)
    }
}

let carrito = document.createElement('div')
carrito.id = 'carrito'
let listaCarrito = []
carrito.innerHTML = listaCarrito
let botonesAgregar = document.querySelectorAll('.btnCarrito')

function agregarAlCarrito(){
    let nombreProducto = card.querySelector('.nombreProducto');
    let precioProducto = card.querySelector('.precioProducto');

    let productoEnCarrito = {
        nombre: nombreProducto,
        precio: precioProducto,
    };

    listaCarrito.push(productoEnCarrito)
    localStorage.setItem("carrito", listaCarrito)
}


botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito)
})

let firstForm = document.createElement('form')
firstForm.id = "formContainer",
firstForm.innerHTML = `<input type="text" id="inputNombre" name="Nombre">
                        <input type="submit" id="firstBtn" value="Enviar">`;


document.body.appendChild(firstForm);


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
});

