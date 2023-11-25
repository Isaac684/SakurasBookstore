
const codigo = document.querySelector('[codigo]');

const urlParams = new URLSearchParams(window.location.search);

codigo.value = urlParams.get('codigo');

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento select
    var selectPaises = document.getElementById("paises");

    // Obtener la lista de países desde el enlace
    fetch('http://127.0.0.1:8000/api/paises')
      .then(response => response.json())
      .then(data => {
        // Iterar sobre el arreglo de países y agregar opciones al select
        data.forEach(function(pais) {
          var opcion = document.createElement("option");
          opcion.value = pais.nombre;
          opcion.text = pais.nombre;
          selectPaises.add(opcion);
        });
      })
      .catch(error => console.error('Error al obtener la lista de países:', error));
  });

const submitButton = document.querySelector('[registro]');
submitButton.addEventListener('click', async function(e){
   e.preventDefault();

    const nombre = document.querySelector('[nombre]');
    const edad = document.querySelector('[edad]');
    const genero = document.querySelector('[genero]');
    const foto = document.querySelector('[foto]');
    const correo = document.querySelector('[correo]');
    const contrasena = document.querySelector('[contraseña]');
    const usuario = document.querySelector('[usuario]');
    const paises = document.querySelector('[pais]');
    const direccionPrincipal = document.querySelector('[d-principal]');
    const direccionesEnvio = document.querySelector('[d-envios]');
    const codigo = document.querySelector('[codigo]');


    if (foto.files.length > 0) {
        const file = foto.files[0];
        const reader = new FileReader();reader.onload = function (e) {

            const formData = new FormData();

            var passwordRegex = /^(?=.*[+*.])(?!.*\s).{8,}$/;

            if (passwordRegex.test(contrasena.value)) {
                formData.append('password', contrasena.value);
                formData.append('username', usuario.value);
                formData.append('email', correo.value);
                formData.append('password', contrasena.value);
                formData.append('name', nombre.value);
                formData.append('age', edad.value);
                formData.append('gender', genero.value);
                formData.append('file', file);
                formData.append('country', paises.value);
                formData.append('address', direccionPrincipal.value);
                formData.append('send_address', direccionesEnvio.value);
                if(codigo.value != ""){
                    formData.append('refer_code', codigo.value); 
                }

                passwordError.textContent = "";
    
                fetch('http://127.0.0.1:8000/api/Usuario', {
                    method: 'POST',
                    headers: {
                        
                    },
                    body: formData,
                }).then(async function(response) {
                    if (!response.ok) {
                        return false;
                    }
                    return response.json();
                }).then(function(data) {
                    if(data.res == true){
                        Swal.fire({
                            title: 'Registrado',
                            text: 'Has sido registrado con exito.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = 'http://127.0.0.1:5501/html/indexSession.html';
                            }
                        });
                    }
                    else
                    {
                        Swal.fire({
                            title: 'Opps..',
                            text: '¡Este usuario o email ya existen! Cambia tus datos.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
    
                }).catch(function(err) {
                    console.error(err);
                });
            } else {
                passwordError.textContent = "La contraseña no cumple con los requisitos.";
            }
       
        };

        reader.readAsDataURL(file);
    }
    else {
        Swal.fire({
            title: 'Opps..',
            text: '¡Tu foto es demasiado grande! Cambia por una mas pequeña.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }





});
