document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('bodyUsuarios');

    try {
        const response = await fetch('http://127.0.0.1:8000/api/Usuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        if (!response.ok) {
            console.error('Error al obtener la lista de usuarios:', response.status);
            return;
        }

        const usuarios = await response.json();

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';

        // Iterar sobre los usuarios y agregar filas a la tabla
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

    } catch (error) {
        console.error('Error en la solicitud de obtener usuarios:', error);
    }
});
