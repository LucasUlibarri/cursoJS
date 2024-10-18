import { eventoAgregarCarrito } from "./main.js";
export function mostrarProductos(productos){
    
    const productsSection = document.getElementById('productsSection');
    productos.forEach(producto => {
        
        const card = document.createElement('div');
        card.classList.add('card')

        card.innerHTML = `
        <img src="${producto.image}" class="card-img" alt="${producto.nombre}">
            <div class="card-content">
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-description">${producto.descripcion}</p>
                <p class="producto-precio">$${producto.precio}</p>
                <input type="number" class="cantidad-input" id="cantidad-${producto.id}" value="1" min="1" max="${producto.stock}" step="1">
            </div>
            <button class="btn-secundario agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        
            `;
        
        productsSection.appendChild(card);        
    });
    eventoAgregarCarrito();
}