function listarLibros(index = 0) {
    fetch('http://127.0.0.1:8000/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const contenedorLibros = document.getElementById('contenedor-libros');
            const libroSinDescuento = document.querySelector('.libroPNormal');
            const libroConDescuento = document.querySelector('.libroPDescuento');
            const total = document.querySelector('.totalLibros');

            // Verificar si hay más elementos en el JSON
            if (index < data.length) {
                // Clonar el elemento de plantilla para el nuevo libro
                //let nuevoLibro = libroSinDescuento.cloneNode(true);
                let nuevoLibro;

                if (data[index].sell_price <= 25.0) {
                    nuevoLibro = libroSinDescuento.cloneNode(true);
                } else {
                    nuevoLibro = libroConDescuento.cloneNode(true);
                }
                nuevoLibro.style.display = ''; // Mostrar el nuevo libro

                // Actualizar contenido con la información del libro actual
                nuevoLibro.querySelector('#imagen').setAttribute('src', data[index].image);
                nuevoLibro.querySelector('#imagen').onclick = function(event) {
                    mostrarInformacionLibro(event, data[index]);
                };
                nuevoLibro.querySelector('.precio').textContent = "$" + data[index].sell_price;
                nuevoLibro.querySelector('.nombre').textContent = data[index].name;
                nuevoLibro.querySelector('.favorito').onclick = function(event) {
                    addToWishlist(data[index].name, data[index].sell_price, data[index].image, data[index].stock);
                };
                nuevoLibro.querySelector('.carrito').onclick = function(event) {
                    agregarCarrito(data[index].name, data[index].sell_price, data[index].image, data[index].stock);
                };
                // Agregar el nuevo libro al contenedor de libros
                contenedorLibros.appendChild(nuevoLibro);

                // Llamar recursivamente para el siguiente libro
                listarLibros(index + 1);
                total.textContent = data.length + " Libros";
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// Llamar a la función para comenzar el proceso
listarLibros();