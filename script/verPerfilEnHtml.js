document.addEventListener("DOMContentLoaded", function() {
    // Llamada a la API para obtener datos (en este caso, usamos JSONPlaceholder como ejemplo)
    fetch('http://127.0.0.1:8000/api/user/' + JSON.parse(localStorage.getItem('userInfo')), {
        headers:{
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      })
        .then(response => response.json())
        .then(data => {
            // Actualizar datos en la página
             fetch(JSON.parse(localStorage.getItem('photoUser')),{
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
                  const imgUser = document.getElementById('user-avatar');
                  imgUser.src = imageURL;
                  imgUser.style.width = '150px';
                  imgUser.style.height = '150px';
                })
                .catch(error => {
                  console.error('Error:', error);
                // Manejo de errores
                });

            document.getElementById('userName').innerText = data.name;
            document.getElementById('userNumber').innerText = data.username;
        })
        .catch(error => console.error('Error al obtener datos:', error));
});