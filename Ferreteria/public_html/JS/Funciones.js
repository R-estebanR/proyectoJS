
function openForm() {
    document.getElementById("chatbotForm").style.display = "block";
}

function closeForm() {
    document.getElementById("chatbotForm").style.display = "none";
}
let productos = [
    {nombre: "Botas", descripcion: "Descripcion 1", cantidad: 5, precio: 25000, imagenes: ["../Imagenes/Productos/Botas 1.jpg", "../Imagenes/Productos/Botas 2.jpg"]},
    {nombre: "Candados", descripcion: "Descripcion 2", cantidad: 3, precio: 15000, imagenes: ["../Imagenes/Productos/Candado 1.jpg", "../Imagenes/Productos/Candado 2.jpg"]},
    {nombre: " Carretillas", descripcion: "Descripcion 2", cantidad: 3, precio: 200000, imagenes: ["../Imagenes/Productos/Carretilla 1.jpg", "../Imagenes/Productos/Carretilla 2.jpg"]},
    {nombre: " Cerraduras", descripcion: "Descripcion 2", cantidad: 3, precio: 130000, imagenes: ["../Imagenes/Productos/Cerradura 1.jpg", "../Imagenes/Productos/Cerradura 2.jpg"]},
    {nombre: " Cintas", descripcion: "Descripcion 2", cantidad: 3, precio: 8000, imagenes: ["../Imagenes/Productos/Cintas 1.jpg", "../Imagenes/Productos/Cintas 2.png"]},
    {nombre: "Gafas", descripcion: "Descripcion 2", cantidad: 3, precio: 12000, imagenes: ["../Imagenes/Productos/Gafas 1.jpg", "../Imagenes/Productos/Gafas 2.jpg"]},
    {nombre: "Guantes", descripcion: "Descripcion 2", cantidad: 3, precio: 4000, imagenes: ["../Imagenes/Productos/Guantes 1.jpg", "../Imagenes/Productos/Guantes 2.jpg"]},
    {nombre: "Herramientas agricultura", descripcion: "Descripcion 2", cantidad: 300000, precio: 20.99, imagenes: ["../Imagenes/Productos/Herramientas agricultura.jpg", "../Imagenes/Productos/Herramientas agricultura 2.jpg"]},
    {nombre: "Herramientas construcción", descripcion: "Descripcion 2", cantidad: 800000, precio: 20.99, imagenes: ["../Imagenes/Productos/Herramientas construcción 1.jpg", "../Imagenes/Productos/Herramientas construcción 2.jpg"]},
    {nombre: "Herramientas de corte", descripcion: "Descripcion 2", cantidad: 3, precio: 388000, imagenes: ["../Imagenes/Productos/Herramientas de corte 1.jpg", "../Imagenes/Productos/Herramientas de corte 2.jpg"]},
    {nombre: " Mangueras", descripcion: "Descripcion 2", cantidad: 3, precio: 40000, imagenes: ["../Imagenes/Productos/Mangueras 1.jpg", "../Imagenes/Productos/Mangueras 2.jpg"]},
    {nombre: "Pegantes", descripcion: "Descripcion 2", cantidad: 3, precio: 30000, imagenes: ["../Imagenes/Productos/Pegantes 1.jpg", "../Imagenes/Productos/Pegantes 2.jpg"]}
];


let carrito = [];

let imagenModal = document.getElementById('img01');
let imgContainer = document.getElementById('imgContainer');
let modal = document.getElementById('myModal');
let captionText = document.getElementById('caption');

function verProductos() {
    let divProductos = document.getElementById('productos');
    for (let i = 0; i < productos.length; i++) {
        let producto = document.createElement('div');
        producto.classList.add('producto');

        let nombre = document.createElement('h2');
        nombre.textContent = productos[i].nombre;

        let descripcion = document.createElement('p');
        descripcion.textContent = productos[i].descripcion;

        let cantidad = document.createElement('p');
        cantidad.textContent = 'Cantidad: ' + productos[i].cantidad;

        let precio = document.createElement('p');
        precio.textContent = 'Precio: ' + productos[i].precio;

        let imagenes = document.createElement('div');
        // En vez de agregar todas las imágenes, solo añade la primera
        let img = document.createElement('img');
        img.src = productos[i].imagenes[0];
        img.onclick = function() { abrirImagenes(i); };
        img.className = 'producto-imagen';
        imagenes.appendChild(img);

        let boton = document.createElement('button');
        boton.textContent = 'Agregar al carrito';
        boton.onclick = function() { agregarAlCarrito(i); };

        producto.appendChild(nombre);
        producto.appendChild(descripcion);
        producto.appendChild(cantidad);
        producto.appendChild(precio);
        producto.appendChild(imagenes);
        producto.appendChild(boton);

        divProductos.appendChild(producto);
    }
}

function agregarAlCarrito(index) {
    let producto = productos[index];
    if (carrito.hasOwnProperty(producto.nombre)) {
        carrito[producto.nombre].cantidad += 1;
    } else {
        carrito[producto.nombre] = {
            cantidad: 1,
            precio: producto.precio,
            imagen: producto.imagenes[0]  // Guarda la URL de la imagen en el carrito
        };
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}



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
    divCarrito.appendChild(precioTotal);
}


function eliminarDelCarrito(nombre) {
    delete carrito[nombre];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    verCarrito();
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



// Cuando haces click en la imagen del producto, muestra el modal y la imagen correspondiente
function abrirImagenes(index) {
    modal.style.display = "block";
    cambiarImagen(index, 0);
}

// Cuando haces click en el boton cerrar (x), cierra el modal
document.getElementsByClassName('close')[0].onclick = function() {
    modal.style.display = "none";
}
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Cambia la imagen en el modal
function cambiarImagen(productoIndex, imagenIndex) {
    imagenModal.src = productos[productoIndex].imagenes[imagenIndex];
    captionText.innerHTML = productos[productoIndex].nombre + ' - Imagen ' + (imagenIndex + 1);

    // Botones para navegar por las imágenes
    let anterior = document.createElement('button');
    anterior.textContent = '<';
    anterior.onclick = function() {
        if (imagenIndex > 0) {
            cambiarImagen(productoIndex, imagenIndex - 1);
        }
    };

    let siguiente = document.createElement('button');
    siguiente.textContent = '>';
    siguiente.onclick = function() {
        if (imagenIndex < productos[productoIndex].imagenes.length - 1) {
            cambiarImagen(productoIndex, imagenIndex + 1);
        }
    };

    imgContainer.innerHTML = '';
    imgContainer.appendChild(anterior);
    imgContainer.appendChild(imagenModal);
    imgContainer.appendChild(siguiente);
}

verProductos();
