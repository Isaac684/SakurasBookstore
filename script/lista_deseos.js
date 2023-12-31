// // Función para obtener la lista de deseos desde localStorage
// function obtenerListaDeseos() {
//     return JSON.parse(localStorage.getItem('lista_deseos')) || [];
// }

// // Función para guardar la lista de deseos en localStorage
// function guardarListaDeseos(listaDeseos) {
//     localStorage.setItem('lista_deseos', JSON.stringify(listaDeseos));
// }

// // Función para agregar un producto a la lista de deseos
// function agregarListaDeseos() {
//     // Obtener los elementos relevantes
//     const tituloElement = this.closest('tr').querySelector('.titulo');
//     const precioElement = this.closest('tr').querySelector('.precio');

//     // Obtener el texto dentro de los elementos
//     const titulo = tituloElement.textContent.trim();
//     const precio = precioElement.textContent.trim();

//     // Resto del código para agregar a la lista de deseos
//     const producto = { titulo, precio };
//     const listaDeseos = obtenerListaDeseos();

//     // Verificar si el producto ya está en la lista de deseos
//     const existeEnLista = listaDeseos.some(item => item.titulo === titulo);

//     if (!existeEnLista) {
//         // Agregar el producto a la lista de deseos
//         listaDeseos.push(producto);
        
//         Swal.fire({
//             icon: 'success',
//             title: '¡Añadido a la lista de deseos!',
//             text: `"${titulo}" ha sido agregado a tu lista de deseos.`,
//         });

//         // Guardar la lista de deseos en localStorage
//         guardarListaDeseos(listaDeseos);

//     } else {
//         Swal.fire({
//             icon: 'warning',
//             title: '¡Producto duplicado!',
//             text: `"${titulo}" ya está en tu lista de deseos.`,
//         });    
//     }
// }

// // Event listener para los botones "Añadir a la lista de deseos"
// document.querySelectorAll('.btn-add-to-wishlist').forEach(btn => {
//     btn.addEventListener('click', agregarListaDeseos);
// });


function addToWishlist(title, price, imageUrl, stock) {
    // Recuperar lista de deseos actual de localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Comprobar si el libro ya está en la lista
    const isAlreadyInWishlist = wishlist.some(book => book.title === title);

    if (isAlreadyInWishlist) {
        // Mostrar alerta de que el libro ya está en la lista
        Swal.fire({
            icon: 'warning',
            title: 'Libro duplicado!',
            html: `<div style="text-align: center;">"${title}" ya esta en tu lista de deseos.</div>`,
        });   
    } else {
        // Añadir el nuevo libro a la lista de deseos
        wishlist.push({ title, price, stock, imageUrl });

        // Guardar la lista de deseos actualizada en localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        Swal.fire({
            icon: 'success',
            title: '¡Añadido a la lista de deseos!',
            html: `<div style="text-align: center;">"${title}" ha sido agregado a tu lista de deseos.</div>`,
        });

        // Agregar un retraso de 1 segundo (1000 milisegundos) antes de redirigir
        // setTimeout(function() {
        //     window.location.href = redirectUrl;
        // }, 2000);
    }
}