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

/* for (const producto of productos){

    let card = document.createElement('div');
    card.innerHTML = `<h3> ${producto.nombre} </h3>
                        <p> ${producto.descripcion}</p>
                        <b> $ ${producto.precio}</b>
                        <button class="btnCarrito">Agregar al carrito</button>`

    document.body.append(card)
} */

/* function btnClick(x, y){
    x = document.getElementById('"'+ x + '"');
    x.addEventListener('click', y)
} */


let firstForm = div
firstForm.className = "formContainer",
firstForm.innerHTML = `<input type="text" id="inputNombre" name="Nombre">
                        <button id="firstBtn">Cargar</button>`;


document.body.appendChild(firstForm);


function storeName(){
    let inputNombre = document.getElementById("inputNombre");
    inputNombre.addEventListener('change', function(e){
    sessionStorage.setItem('Nombre', e.target.value);
})
}

let btn = document.getElementById('firstBtn')
btn.addEventListener("click", storeName)


//let firstBtn = document.getElementById('firstBtn');
//firstBtn.addEventListener('click', f());