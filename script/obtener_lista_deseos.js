document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la lista de deseos desde localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


    // Obtener la tabla de deseos en el segundo HTML
    let wishlistTable = document.getElementById('wishlist-table-body');

    // Iterar sobre los libros en la lista de deseos y agregarlos a la tabla
    wishlist.forEach(function(book) {
        let row = wishlistTable.insertRow();
        row.innerHTML = `
            <td><img src="${book.imageUrl}" alt="" class="rounded-top-md align-self-center" width="60" height="95"></td>
            <td><span class="titulo">${book.title}</span></td>
            <td><span class="precio">$ ${book.price}</span></td>
            <td><button class="round-black-btn btn-dark" onclick="agregarCarrito('${book.title}', '${book.price}','${book.imageUrl}','${book.stock}')">Añadir al carrito</button></td>
            <td><button class="round-black-btn btn-dark" onclick="removeFromWishlist('${book.title}')">Eliminar</button></td>
        `;
    });
});

// Función para eliminar un libro de la lista de deseos
function removeFromWishlist(title) {
    // Recuperar la lista de deseos desde localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filtrar la lista de deseos para excluir el libro con el título proporcionado
    wishlist = wishlist.filter(book => book.title !== title);

    // Actualizar la lista de deseos en localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Recargar la página para reflejar los cambios en la interfaz de usuario
    location.reload();
}

function agregarCarrito(title, price, imageUrl, stock) {
    // Recuperar lista de deseos actual de localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Comprobar si el libro ya está en la lista
    const isAlreadyInWishlist = carrito.some(book => book.title === title);

    if (isAlreadyInWishlist) {
        // Mostrar alerta de que el libro ya está en la lista
        Swal.fire({
            icon: 'warning',
            title: 'Producto duplicado!',
            html: `<div style="text-align: center;">"${title}" ya esta en tu carrito.</div>`,
        });   
    } else {
        // Añadir el nuevo libro a la lista de deseos
        carrito.push({ title, price, stock, imageUrl });

        // Guardar la lista de deseos actualizada en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
            icon: 'success',
            title: '¡Añadido al carrito de compras!',
            html: `<div style="text-align: center;">"${title}" ha sido agregado en tu carrito.</div>`,
        });
        Swal.fire({
            icon: 'success',
            title: '¡Añadido al carrito de compras!',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
            <a class="nav-link" aria-current="page" href="../html/carrito.html">Ir al carrito</a>
            `,
            cancelButtonText: `
              Seguir comprando
            `,
          });
    }
}