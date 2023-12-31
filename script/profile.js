async function mostrarAlerta() {
  const nombreCompletoInput = document.getElementById('nombrecompleto'); 
  const nombreInput = document.getElementById('nombre'); 
  const edadInput = document.getElementById('edad');
  const generoInput = document.getElementById('genero');
  const paisInput = document.getElementById('pais');
  const emailInput = document.getElementById('email');
  const contraseniaInput = document.getElementById('password');
  const direccionInput = document.getElementById('direccion');
  const direcionEnvioInput = document.getElementById('direccion_envio');
  const fotoInput = document.getElementById('photo');

  // Obtener la información del usuario
  const datosActualizados = {
    username: nombreCompletoInput.value,
    email: emailInput.value,
    name: nombreInput.value,
    country: paisInput.value,
    address: direccionInput.value,
    age: edadInput.value,
    gender: generoInput.value,
    password: contraseniaInput.value,
    send_address: direcionEnvioInput.value,
    photo: fotoInput.value, // asumiendo que fotoInput.value contiene la URL de la foto
  };

  try {
    // Hacer una solicitud de actualización a la API
    const response = await fetch('http://127.0.0.1:8000/api/user/' + JSON.parse(localStorage.getItem('userInfo')), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) {
      throw new Error('Hubo un problema al enviar los datos.');
    }

    // Si la solicitud fue exitosa, mostrar un modal de éxito
    Swal.fire({
      title: 'Actualizado',
      text: 'El usuario ha sido actualizado',
      icon: 'success',
      customClass: {
        content: 'text-center'
      }
    });

  } catch (error) {
  }
}

function index() {
  window.location.href = '../html/indexSession.html'
}

async function dataShow() {
  const nombreCompletoInput = document.getElementById('nombrecompleto'); 
  const nombreInput = document.getElementById('nombre'); 
  const edadInput = document.getElementById('edad');
  const generoInput = document.getElementById('genero');
  const paisInput = document.getElementById('pais');
  const emailInput = document.getElementById('email');
  const direccionInput = document.getElementById('direccion');
  const direcionEnvioInput = document.getElementById('direccion_envio');
  const codigo = document.querySelector('[refer_code]');
  const clipboard_ = document.querySelector('[refer]');

  await fetch('http://127.0.0.1:8000/api/user/' + JSON.parse(localStorage.getItem('userInfo')), {
        headers:{
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar los datos.');
        }
        return response.json();
      })
      .then(data => {
        nombreCompletoInput.value = data.username;
        nombreInput.value = data.name;
        edadInput.value = data.age;
        generoInput.value = data.gender;
        paisInput.value= data.country;
        emailInput.value = data.email;
        direccionInput.value = data.address;
        direcionEnvioInput.value = data.send_address;
        codigo.textContent = data.refer_code; 
        clipboard_.addEventListener('click',function(){
          try {
          navigator.clipboard.writeText('http://127.0.0.1:5501/html/registro.html?codigo=' + data.refer_code)
          console.log('Texto copiado al portapapeles')
          } catch (err) {
            console.error(err)
          }
          Swal.fire({
            title: 'Codigo copiado',
            text: 'Ahora puedes compartir tu enlace',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
              
          });
        });
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });

      await fetch(JSON.parse(localStorage.getItem('photoUser')),{
        headers:{
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(response => {

        if(!response.ok){
          throw new Error('Hubo un problema al enviar los datos.');
        }
        return response.blob();

        }).then(blob => {
          const imageURL = URL.createObjectURL(blob);
          console.log(imageURL);
          const imgUser = document.getElementById('photo');
          imgUser.src = imageURL;
          imgUser.style.width = '280px';
          imgUser.style.height = '290px';
        })
        .catch(error => {
          console.error('Error:', error);
        // Manejo de errores
        });
      }

dataShow();