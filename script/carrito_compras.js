function agregarCarrito(title, price, imageUrl, stock, cantidad) {
    // Recuperar lista de deseos actual de localStorage
    let wishlist = JSON.parse(localStorage.getItem('carrito')) || [];

    // Comprobar si el libro ya está en la lista
    const isAlreadyInWishlist = wishlist.some(book => book.title === title);

    if (isAlreadyInWishlist) {
        // Mostrar alerta de que el libro ya está en la lista
        Swal.fire({
            icon: 'warning',
            title: 'Producto duplicado!',
            html: `<div style="text-align: center;">"${title}" ya esta en tu carrito.</div>`,
        });   
    }else if (cantidad > stock) {
        // Mostrar alerta de que ingreso mas stock del disponible
        Swal.fire({
            icon: 'warning',
            title: 'La cantidad ingresada es mayor al stock!',
            html: `<div style="text-align: center;">"${title}" tiene solamene ${stock} libros en stock.</div>`,
        });   
    } else {
        // Añadir el nuevo libro a la lista de deseos
        wishlist.push({ title, price, stock, imageUrl, cantidad });

        // Guardar la lista de deseos actualizada en localStorage
        localStorage.setItem('carrito', JSON.stringify(wishlist));

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