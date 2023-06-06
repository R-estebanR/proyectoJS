

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function verCarrito() {
    let divCarrito = document.getElementById('carrito');
    divCarrito.innerHTML = '';

    let total = 0;
    for (let nombre in carrito) {
        // Crea un contenedor para el producto
        let producto = document.createElement('div');
        producto.className = "producto"; 

        // Agrega la imagen al contenedor del producto
        let img = document.createElement('img');
        img.src = carrito[nombre].imagen;
        img.className = 'producto-imagen'; 
        producto.appendChild(img);

        // Agrega los detalles del producto al contenedor del producto
        let detalles = document.createElement('p');
        detalles.textContent = nombre + ' - ' + carrito[nombre].cantidad + ' - ' + carrito[nombre].precio;
        producto.appendChild(detalles);

        // Crea un botón de eliminar
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar unidad';
        botonEliminar.onclick = function() { eliminarUnidadDelCarrito(nombre); };
        producto.appendChild(botonEliminar);

        // Agrega el producto al carrito
        divCarrito.appendChild(producto);

        total += carrito[nombre].precio * carrito[nombre].cantidad;
    }

    let precioTotal = document.createElement('p');
    precioTotal.textContent = 'Total: ' + total;
    precioTotal.className = 'total'; // Nueva clase
    divCarrito.appendChild(precioTotal);
}

function eliminarUnidadDelCarrito(nombre) {
    if (carrito[nombre].cantidad > 1) {
        carrito[nombre].cantidad -= 1;
    } else {
        delete carrito[nombre];
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    verCarrito();
}



function eliminarDelCarrito(nombre) {
    delete carrito[nombre];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    verCarrito();
}

// Ejecuta la función cuando la página se carga
window.onload = verCarrito;
