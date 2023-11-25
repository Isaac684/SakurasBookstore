function agregarCarrito(title, price, imageUrl, stock) {
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
    } else {
        // Añadir el nuevo libro a la lista de deseos
        wishlist.push({ title, price, stock, imageUrl });

        // Guardar la lista de deseos actualizada en localStorage
        localStorage.setItem('carrito', JSON.stringify(wishlist));

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
            <a class="nav-link" aria-current="page" href="../html/carrito_user.html">Ir al carrito</a>
            `,
            cancelButtonText: `
              Seguir comprando
            `,
          });
    }
}