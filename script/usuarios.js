document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput2');
    const tableBody = document.getElementById('bodyUsuarios');

    let originalUsuarios = [];

    try {
        const response = await fetch('http://127.0.0.1:8000/api/Usuario', {
            headers:{
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        });

        if (!response.ok) {
            console.error('Error al obtener la lista de usuarios:', response.status);
            return;
        }

        originalUsuarios = await response.json();

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';

        // Función para agregar filas a la tabla
        function agregarFilas(usuarios) {
            usuarios.forEach((usuario, index) => {
                const row = tableBody.insertRow();
                const cellNombre = row.insertCell(0);
                const cellUsuario = row.insertCell(1);
                const cellPais = row.insertCell(2);
                const cellAcciones = row.insertCell(3);

                // Rellenar las celdas con datos del usuario
                cellNombre.textContent = usuario.name;
                cellUsuario.textContent = usuario.username;
                cellPais.textContent = usuario.country;

                // Botones de acciones (editar y eliminar)
                const btnEditar = document.createElement('button');
                btnEditar.className = 'btn btn-outline-secondary btn-sm mx-1';
                btnEditar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#pencil"/></svg>';
                btnEditar.addEventListener('click', () => mostrarModalEditar(usuario));

                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-outline-secondary btn-sm mx-1';
                btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
                btnEliminar.addEventListener('click', () => eliminarUsuario(usuario.id));

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
            const usuariosFiltrados = originalUsuarios.filter(usuario => usuario.name.toLowerCase().includes(filtro));
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar las filas filtradas
            agregarFilas(usuariosFiltrados);
        }

        // Mostrar todos los usuarios inicialmente
        agregarFilas(originalUsuarios);

        // Declarar la función eliminarProducto fuera del bloque DOMContentLoaded
        async function eliminarUsuario(id) {
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
                    const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                        },
                    });

                    if (!response.ok) {
                        console.error('Error al eliminar el usuario:', error.message);
                        return;
                    }

                    // Actualizar la lista de productos después de la eliminación
                    const updatedUsuarios = originalUsuarios.filter(usuario => usuario.id !== id);
                    originalUsuarios = updatedUsuarios;

                    // Volver a mostrar la tabla actualizada
                    filtrarTabla();

                    // Mostrar mensaje de éxito con SweetAlert
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El usuario ha sido eliminado',
                        icon: 'success',
                        customClass: {
                            content: 'text-center'
                        }
                    });

                    console.log('Usuario eliminado exitosamente!');
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                }
            }
        }
        
        // Función para mostrar el modal de edición con SweetAlert
        function mostrarModalEditar(usuario) {
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
                            <label for="nombre" class="swal2-label">Username</label>
                            <input id="nombre" class="swal2-input" value="${usuario.username}" required>
                        </div>
                        <div class="col-4">
                            <label for="editorial" class="swal2-label">Email</label>
                            <input id="editorial" class="swal2-input" value="${usuario.email}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Name</label>
                            <input id="autor" class="swal2-input" value="${usuario.name}" required>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Pais</label>
                            <input id="autor" class="swal2-input" value="${usuario.country}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Direccion</label>
                            <input id="autor" class="swal2-input" value="${usuario.address}" required>
                        </div>
                        <div class="col-4">
                            <label for="autor" class="swal2-label">Direccion de envio</label>
                            <input id="autor" class="swal2-input" value="${usuario.send_address}" required>
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
            });
        }      

    } catch (error) {
        console.error('Error en la solicitud de obtener usuarios:', error);
    }
});
