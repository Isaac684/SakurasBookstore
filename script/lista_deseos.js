// Función para obtener la lista de deseos desde localStorage
function obtenerListaDeseos() {
    return JSON.parse(localStorage.getItem('lista_deseos')) || [];
}

// Función para guardar la lista de deseos en localStorage
function guardarListaDeseos(listaDeseos) {
    localStorage.setItem('lista_deseos', JSON.stringify(listaDeseos));
}

// Función para agregar un producto a la lista de deseos
function agregarListaDeseos() {
    // Obtener los elementos relevantes
    const tituloElement = this.closest('tr').querySelector('.titulo');
    const precioElement = this.closest('tr').querySelector('.precio');

    // Obtener el texto dentro de los elementos
    const titulo = tituloElement.textContent.trim();
    const precio = precioElement.textContent.trim();

    // Resto del código para agregar a la lista de deseos
    const producto = { titulo, precio };
    const listaDeseos = obtenerListaDeseos();

    // Verificar si el producto ya está en la lista de deseos
    const existeEnLista = listaDeseos.some(item => item.titulo === titulo);

    if (!existeEnLista) {
        // Agregar el producto a la lista de deseos
        listaDeseos.push(producto);
        
        Swal.fire({
            icon: 'success',
            title: '¡Añadido a la lista de deseos!',
            text: `"${titulo}" ha sido agregado a tu lista de deseos.`,
        });

        // Guardar la lista de deseos en localStorage
        guardarListaDeseos(listaDeseos);

    } else {
        Swal.fire({
            icon: 'warning',
            title: '¡Producto duplicado!',
            text: `"${titulo}" ya está en tu lista de deseos.`,
        });    
    }
}

// Event listener para los botones "Añadir a la lista de deseos"
document.querySelectorAll('.btn-add-to-wishlist').forEach(btn => {
    btn.addEventListener('click', agregarListaDeseos);
});
