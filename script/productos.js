// document.addEventListener('DOMContentLoaded', async function () {
//     const searchInput = document.getElementById('searchInput');
//     const tableBody = document.getElementById('bodyProductos');

//     try {
//         const response = await fetch('http://127.0.0.1:8000/api/Productos', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json; charset=utf-8',
//             },
//         });

//         if (!response.ok) {
//             console.error('Error al obtener la lista de productos:', response.status);
//             return;
//         }

//         const productos = await response.json();

//         // Limpiar el cuerpo de la tabla
//         tableBody.innerHTML = '';

//         // Iterar sobre los productos y agregar filas a la tabla
//         productos.forEach((producto, index) => {
//             const row = tableBody.insertRow();
//             const cellNombre = row.insertCell(0);
//             const cellEditorial = row.insertCell(1);
//             const cellAutor = row.insertCell(2);
//             const cellAcciones = row.insertCell(3);

//             // Rellenar las celdas con datos del producto
//             cellNombre.textContent = producto.name;
//             cellEditorial.textContent = producto.editorial;
//             cellAutor.textContent = producto.author;

//             const img = document.createElement('img');
//             img.src = 'http://127.0.0.1:8000/api/files/' + producto.image; 
//             img.style.width = '50px'; 

//             // Botones de acciones (editar y eliminar)
//             const btnEditar = document.createElement('button');
//             btnEditar.className = 'btn btn-outline-secondary p-1 me-1';
//             btnEditar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#pencil"/></svg>';
//             //btnEditar.addEventListener('click', () => editarProducto(producto));

//             const btnEliminar = document.createElement('button');
//             btnEliminar.className = 'btn btn-outline-secondary p-1';
//             btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
//             //btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));

//             cellAcciones.appendChild(btnEditar);
//             cellAcciones.appendChild(btnEliminar);
//         });

//     } catch (error) {
//         console.error('Error en la solicitud de obtener productos:', error);
//     }
// });

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
                //btnEditar.addEventListener('click', () => editarProducto(producto));

                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-outline-secondary p-1';
                btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
                //btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));

                cellAcciones.appendChild(btnEditar);
                cellAcciones.appendChild(btnEliminar);
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

    } catch (error) {
        console.error('Error en la solicitud de obtener productos:', error);
    }
});
