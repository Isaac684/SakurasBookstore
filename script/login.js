const btn = document.getElementById('submitBtn');
btn.addEventListener('click', async function (e) {
    e.preventDefault();
    const user = document.getElementById('username');
    const pass = document.getElementById('password');

    const jss = {
        "username": user.value,
        "password": pass.value
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/Login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(jss)
        });

        if (!response.ok) {
            console.error('Error al iniciar sesión:', response.status);
            return;
        }

        const data = await response.json();

        if (data.res === true) {
            localStorage.setItem('token', JSON.stringify(data.token));

            const userDetailsResponse = await fetch(`http://127.0.0.1:8000/api/Usuario?username=${user.value}&password=${pass.value}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
            });

            if (!userDetailsResponse.ok) {
                console.error('Error al obtener detalles del usuario:', userDetailsResponse.status);
                return;
            }

            const userDetails = await userDetailsResponse.json();

            const usuarioEncontrado = userDetails.find(u => u.username === user.value);

            if (usuarioEncontrado) {
                // Almacena los detalles del usuario en localStorage
                localStorage.setItem('userInfo', JSON.stringify(usuarioEncontrado.id));
                localStorage.setItem('photoUser', JSON.stringify(usuarioEncontrado.photo));

                //window.location.href = "../html/indexSession.html";
                 // Alerta Sweet para inicio de sesión exitoso
                 Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido!',
                }).then(() => {
                    window.location.href = "../html/indexSession.html";
                });
            } else {
                //console.error('Usuario no encontrado.');
                // Alerta Sweet para usuario no encontrado
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado',
                    text: 'Verifica tus credenciales.',
                });
            }
        } else {
            //console.error('Credenciales incorrectas.');
            // Alerta Sweet para credenciales incorrectas
            Swal.fire({
                icon: 'error',
                title: 'Credenciales incorrectas',
                text: 'Verifica tu nombre de usuario y contraseña.',
            });
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
    }
});



