document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.querySelector('.table tbody');

    try {
        const response = await fetch('http://127.0.0.1:8000/api/Productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        if (!response.ok) {
            console.error('Error al obtener la lista de productos:', response.status);
            return;
        }

        const productos = await response.json();

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';

        // Iterar sobre los productos y agregar filas a la tabla
        productos.forEach((producto, index) => {
            const row = tableBody.insertRow();
            const cellNum = row.insertCell(0);
            const cellNombre = row.insertCell(1);
            const cellEditorial = row.insertCell(2);
            const cellAutor = row.insertCell(3);
            const cellCategoria = row.insertCell(4);
            const cellImagen = row.insertCell(5);
            const cellPrecio = row.insertCell(6);
            const cellPrecioVenta = row.insertCell(7);
            const cellAcciones = row.insertCell(8);

            // Rellenar las celdas con datos del producto
            cellNum.textContent = index + 1;
            cellNombre.textContent = producto.name;
            cellEditorial.textContent = producto.editorial;
            cellAutor.textContent = producto.author;
            cellCategoria.textContent = producto.category;

            const img = document.createElement('img');
            img.src = producto.image;
            img.style.width = '50px';
            cellImagen.appendChild(img);

            cellPrecio.textContent = '$' + producto.price;
            cellPrecioVenta.textContent = '$' + producto.sell_price;


            // Botones de acciones (editar y eliminar)
            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-outline-success btn-sm mx-1';
            btnEditar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#pencil"/></svg>';
            //btnEditar.addEventListener('click', () => editarProducto(producto));

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-outline-danger btn-sm mx-1';
            btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
            //btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));

            cellAcciones.appendChild(btnEditar);
            cellAcciones.appendChild(btnEliminar);
        });

    } catch (error) {
        console.error('Error en la solicitud de obtener productos:', error);
    }
});