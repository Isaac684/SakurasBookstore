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
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El producto ha sido eliminado',
                        icon: 'success',
                        customClass: {
                            content: 'text-center'
                        }
                    });

                    console.log('Producto eliminado exitosamente!');
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                }
            }
        }
        
        // Función para mostrar el modal de edición con SweetAlert
        async function mostrarModalEditar(producto) {
            swal.fire({
                showCloseButton: true,
                focusConfirm: false,
                heightAuto:false,
                width:'60%',
                position:'center',
                html: 
                `
                <div class="fuente3 rounded-3 p-4 bg-light">
                    <h2 class="text-center mb-4">Editar Producto</h2>

                    <div class="mb-3 row">
                        <div class="col-md-4">
                            <label for="nombre" class="form-label fs-6">Nombre:</label>
                            <input id="nombre" class="form-control rounded-3" value="${producto.name}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="descripcion" class="form-label fs-6">Descripción:</label>
                            <input id="descripcion" class="form-control rounded-3" value="${producto.description}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="editorial" class="form-label fs-6">Editorial:</label>
                            <input id="edito" class="form-control rounded-3" value="${producto.editorial}" required>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <div class="col-md-4">
                            <label for="anio" class="form-label fs-6">Año:</label>
                            <input id="anio" class="form-control rounded-3" value="${producto.year}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="aut" class="form-label fs-6">Autor:</label>
                            <input id="aut" class="form-control rounded-3" value="${producto.author}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="pric" class="form-label fs-6">Precio:</label>
                            <input id="pric" class="form-control rounded-3" value="${producto.price}" required>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <div class="col-md-4">
                            <label for="produc" class="form-label fs-6">Stock:</label>
                            <input id="produc" class="form-control rounded-3" value="${producto.stock}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="sell" class="form-label fs-6">Precio de Venta:</label>
                            <input id="sell" class="form-control rounded-3" value="${producto.sell_price}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="cate" class="form-label fs-6">Género:</label>
                            <input id="cate" class="form-control rounded-3" value="${producto.category}" required>
                        </div>
                    </div>
                </div>

                `,
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Modificar',
                showLoaderOnConfirm: true,
                customClass: {
                    confirmButton: 'fuente3',  // Aplicar fuente3 al botón Confirmar
                    cancelButton: 'fuente3'   // Aplicar fuente3 al botón Cancelar
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Obtener referencias a los elementos HTML dentro del modal
                    const nombreInput = document.getElementById('nombre');
                    const descripcionInput = document.getElementById('descripcion');
                    const editorialInput = document.getElementById('edito');
                    const anioInput = document.getElementById('anio');
                    const autorInput = document.getElementById('aut');
                    const priceInput = document.getElementById('pric');
                    const productoInput = document.getElementById('produc');
                    const sellPriceInput = document.getElementById('sell');
                    const categoryInput = document.getElementById('cate');
                    console.log(editorialInput.value);
                    // Crear un objeto con los datos actualizados del producto
                    const datosActualizados = {
                        name: nombreInput.value,
                        description: descripcionInput.value,
                        editorial: editorialInput.value,
                        year: anioInput.value,
                        author: autorInput.value,
                        price: priceInput.value,
                        stock: productoInput.value,
                        sell_price: sellPriceInput.value,
                        category: categoryInput.value,
                        id_provider: "1"

                    };
        
                    // Hacer una solicitud de actualización a la API
                    await fetch('http://127.0.0.1:8000/api/ActualizarProductos/'+producto.id, {
                        method: 'PUT', // O el método HTTP que la API requiera
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                        },
                        body: JSON.stringify(datosActualizados),
                    })
                    .then(response => {
                        if (!response.ok) {
                          throw new Error('Hubo un problema al enviar los datos.');
                        }
                        
                        return response.json();
                    })
                    .then(data => {
                      
                        console.log('Producto actualizado con éxito:', data);
                        swal.fire({
                            title: '¡Éxito!',
                            text: 'Producto actualizado correctamente',
                            icon: 'success',
                            customClass: {
                                content: 'text-center',  // Centro del texto del mensaje
                            },
                        });                    
                    })
                    .catch(error => {
                       
                        console.error('Error al actualizar el producto:', error);
                        swal.fire('¡Error!', 'Hubo un error al actualizar el producto', 'error');
                    });
                }
            });
        }






           

    } catch (error) {
        console.error('Error en la solicitud de obtener productos:', error);
    }
});

