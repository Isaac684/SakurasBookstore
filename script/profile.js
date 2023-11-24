function mostrarAlerta() {
   Swal.fire({
       title: '¡Título de la alerta!',
       text: 'Have a nice day!',
       icon: 'success',
       confirmButtonText: 'OK'
   });

}
async function dataShow(){


   const nombreInput = document.getElementById('nombre');
   const edadInput = document.getElementById('edad');
   const generoInput = document.getElementById('genero');
   const paisInput = document.getElementById('pais');
   const emailInput = document.getElementById('email');
   const contraseniaInput = document.getElementById('password');

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

                nombreInput.value = data.name;
                edadInput.value = data.age;
                generoInput.value = data.gender;
                paisInput.value= data.country;
                emailInput.value = data.email;
                contraseniaInput.value = data.password;
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
  })
  .catch(error => {
  console.error('Error:', error);
  // Manejo de errores
  });
}
dataShow();