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
        card.innerHTML = `<h3> ${producto.nombre} </h3>
                            <p> ${producto.descripcion}</p>
                            <b> $ ${producto.precio}</b>
                            <button class="btnCarrito">Agregar al carrito</button>`
        document.body.append(card)
    }
}

    

let firstForm = document.createElement('form')
firstForm.id = "formContainer",
firstForm.innerHTML = `<input type="text" id="inputNombre" name="Nombre">
                        <input type="submit" id="firstBtn" value="Enviar">`;


document.body.appendChild(firstForm);


/* function storeName(){
    let inputNombre = document.getElementById("inputNombre");
    inputNombre.addEventListener('change', function(e){
    sessionStorage.setItem('Nombre', e.target.value);
})
} */

let inputNombre = document.getElementById("inputNombre");
let btn = document.getElementById('firstBtn')

/* btn.addEventListener("click", () => {
    inputNombre.addEventListener("change", (e)=>{
        sessionStorage.setItem('nombre', e.target.value);
    })
}) */

let validarForm = document.getElementById('formContainer')
/* validarForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    inputNombre.addEventListener("change", (evento)=>{
        sessionStorage.setItem('nombre', evento.target.value);
    })
}) */


let nombreUsuario = sessionStorage.getItem('nombre')

let nombreDisplay = div
nombreDisplay.className = 'nombreDisplay';
nombreDisplay.innerHTML = '<h1>Bienvenido ' + nombreUsuario + '!</h1>';

btn.addEventListener("click", () => {    
    inputNombre.addEventListener("change", (evento)=>{
        sessionStorage.setItem('nombre', evento.target.value);
    })
    document.getElementById('formContainer').remove();
    document.body.appendChild(nombreDisplay)
    listaProductos()
});


//let firstBtn = document.getElementById('firstBtn');
//firstBtn.addEventListener('click', f());