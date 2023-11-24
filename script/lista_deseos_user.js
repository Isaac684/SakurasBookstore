async function addToWishlistUser(id_product) {
    console.log('2');
    await fetch('http://127.0.0.1:8000/api/user/' + JSON.parse(localStorage.getItem('userInfo')) + '/wish-list', {
        headers:{
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      })
      .then(response => {
        console.log('3');
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar los datos.');
        }
        return response.json();
      })
      .then(data =>{
        
        const inList = data.some(item => item.id_product === id_product);
        if(inList){
            Swal.fire({
                icon: 'warning',
                title: 'Libro duplicado!',
                html: `<div style="text-align: center;">"El libro ya esta en tu lista de deseos.</div>`,
            }); 
        }else{
            addToWishlist(id_product);
        }
    })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });
}
async function addToWishlist(id_product){
    const jss = {
        "id_user": JSON.parse(localStorage.getItem('userInfo')),
        "id_product": id_product
    };

    await fetch('http://127.0.0.1:8000/api/user/' + JSON.parse(localStorage.getItem('userInfo')) + '/add-wish-list', {
        method: 'POST',
        headers:{
          "Content-Type": "application/json; charset=utf-8",
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify(jss)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar los datos.');
        }
        return response.json();
      })
      .then(data =>{
        if(data.res){
            Swal.fire({
                icon: 'success',
                title: '¡Añadido a la lista de deseos!',
                html: `<div style="text-align: center;">"El libro ha sido agregado a tu lista de deseos.</div>`,
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });
}
