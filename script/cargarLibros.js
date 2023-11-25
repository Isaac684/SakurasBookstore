async function listarLibros(index = 0) {

    fetch('http://127.0.0.1:8000/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(async function (data) {
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
                nuevoLibro.querySelector('.favorito').onclick = async function(event) {
                    let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                    if(idUser == ""){
                        addToWishlist(data[index].name, data[index].sell_price, data[index].image, data[index].stock);
                    }else{
                        console.log('1');
                        addToWishlistUser(data[index].id);
                    }
                    
                };
                nuevoLibro.querySelector('.carrito').onclick = function(event) {
                    let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                    if(idUser == ""){
                        agregarCarrito(data[index].name, data[index].sell_price, data[index].image, data[index].stock);
                    }else{
                        addShoppingCarUser(data[index].id, data[index].sell_price);
                    }
                   
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


