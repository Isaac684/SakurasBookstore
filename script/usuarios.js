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
                //btnEditar.addEventListener('click', () => editarUsuario(usuario));

                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-outline-secondary btn-sm mx-1';
                btnEliminar.innerHTML = '<svg class="bi" width="18" height="18" fill="currentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#trash"/></svg>';
                //btnEliminar.addEventListener('click', () => eliminarUsuario(usuario.id));

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

    } catch (error) {
        console.error('Error en la solicitud de obtener usuarios:', error);
    }
});
