// Declarar la función eliminarProducto fuera del bloque DOMContentLoaded
async function eliminarProducto(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo',
        showLoaderOnConfirm: true,
        customClass: {
            content: 'text-center'
        }
    });

    if (result.isConfirmed) {
        try {
            // Enviar la solicitud de eliminación solo si el usuario confirma
            const response = await fetch(`http://127.0.0.1:8000/api/Productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
            });

            if (!response.ok) {
                console.error('Error al eliminar el producto:', error.message);
                return;
            }

            // Actualizar la lista de productos después de la eliminación
            const updatedProductos = originalProductos.filter(producto => producto.id !== id);
            originalProductos = updatedProductos;

            // Volver a mostrar la tabla actualizada
            filtrarTabla();

            // Mostrar mensaje de éxito con SweetAlert
            Swal.fire(
                '¡Eliminado!',
                'El producto ha sido eliminado.',
                'success'
            );

            console.log('Producto eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput1');
    const tableBody = document.getElementById('bodyProductos');
    let originalProductos = [];

    try {
        const response = await fetch('http://127.0.0.1:8000/api/Productos', {
            headers:{
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        });

        if (!response.ok) {
            console.error('Error al obtener la lista de productos:', response.status);
            return;
        }

        originalProductos = await response.json();

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';

        // Función para agregar filas a la tabla
        function agregarFilas(productos) {
            productos.forEach((producto, index) => {
                const row = tableBody.insertRow();
                const cellNombre = row.insertCell(0);
                const cellEditorial = row.insertCell(1);
                const cellAutor = row.insertCell(2);
                const cellAcciones = row.insertCell(3);

                // Rellenar las celdas con datos del producto
                cellNombre.textContent = producto.name;
                cellEditorial.textContent = producto.editorial;
                cellAutor.textContent = producto.author;

                const img = document.createElement('img');
                img.src = 'http://127.0.0.1:8000/api/files/' + producto.image; 
                img.style.width = '50px'; 

                // Botones de acciones (editar y eliminar)
                const btnEditar = document.createElement('button');
                btnEditar.className = 'btn btn-outline-secondary p-1 me-1';
                btnEditar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#pencil"/></svg>';
                btnEditar.addEventListener('click', () => mostrarModalEditar(producto));

                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-outline-secondary p-1';
                btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
                btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));
                
                cellAcciones.appendChild(btnEliminar);
                cellAcciones.appendChild(btnEditar);
            });
        }

        // Agrega el evento de input al campo de búsqueda para filtrar automáticamente
        searchInput.addEventListener('input', function () {
            filtrarTabla();
        });

        // Función para filtrar la tabla
        function filtrarTabla() {
            const filtro = searchInput.value.toLowerCase();
            const productosFiltrados = originalProductos.filter(producto => producto.name.toLowerCase().includes(filtro));
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar las filas filtradas
            agregarFilas(productosFiltrados);
        }

        // Mostrar todos los productos inicialmente
        agregarFilas(originalProductos);

        // Función para mostrar el modal de edición con SweetAlert
        function mostrarModalEditar(producto) {
            swal.fire({
                showCloseButton: true,
                focusConfirm: false,
                heightAuto:false,
                width:'60%',
                position:'center',
                html: 
                `
                <div class="fuente3 rounded-3 d-flex flex-column">
                    <div class="d-flex flex-row">
                        <div class="col-4">
                            <label for="nombre" class="swal2-label">Nombre</label>
                            <input id="nombre" class="swal2-input" value="${producto.name}" required>
                        </div>
                        <div class="col-4">
                            <label for="editorial" class="swal2-label">Descripcion</label>
                            <input id="editorial" class="swal2-input" value="${producto.description}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Editorial</label>
                            <input id="autor" class="swal2-input" value="${producto.editorial}" required>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Anio</label>
                            <input id="autor" class="swal2-input" value="${producto.year}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Autor</label>
                            <input id="autor" class="swal2-input" value="${producto.author}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Precio</label>
                            <input id="autor" class="swal2-input" value="${producto.price}" required>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Stock</label>
                            <input id="autor" class="swal2-input" value="${producto.stock}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Precio de venta</label>
                            <input id="autor" class="swal2-input" value="${producto.sell_price}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Genero</label>
                            <input id="autor" class="swal2-input" value="${producto.category}" required>
                        </div>
                    </div>
                    <!-- Puedes continuar agregando más bloques de tres columnas según sea necesario -->
                </div>
                `,
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Modificar',
                showLoaderOnConfirm: true,
            });
        }      

    } catch (error) {
        console.error('Error en la solicitud de obtener productos:', error);
    }
});