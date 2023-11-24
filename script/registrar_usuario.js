


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

    let gender = false;
    if(genero.value == 'Masculino'){
        gender = true;
    }

    if (foto.files.length > 0) {
        const file = foto.files[0];
        const reader = new FileReader();reader.onload = function (e) {
            const base64Image = e.target.result;const imgElement = document.createElement('img');
            imgElement.src = base64Image;
            document.body.appendChild(imgElement);const base64Value = base64Image;
                    
            const jss = {
                "username": usuario.value,
                "email": correo.value,
                "password": contrasena.value,
                "name": nombre.value,
                "age": edad.value,
                "gender": gender,
                "photo": base64Value, 
                "country": paises.value,
                "address": direccionPrincipal.value,
                "send_address": direccionesEnvio.value,
                "refer_code": "64ZTR2FNPQ"
            };
            fetch('http://127.0.0.1:8000/api/Usuario', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(jss)
            }).then(async function(response) {
                if (!response.ok) {
                    return false;
                }
                return response.json();
            }).then(async function(data) {

                if(data.res == true){
                    alert("registrado");
                    window.location.href = 'http://127.0.0.1:5501/html/indexSession.html'
                }

            }).catch(function(err) {
                console.error(err);
            });
        };

        reader.readAsDataURL(file);
    }



});
