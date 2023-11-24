async function addShoppingCarUser(id_product, precio) {
    console.log('2');
    await fetch('http://127.0.0.1:8000/api/Show/' + JSON.parse(localStorage.getItem('userInfo')), {
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
      .then(data =>{
        if(data.length === 0){
            console.log('34')
            addToShoppingCar(id_product, precio);
        
        }else{
            console.log(data);
            const existingProduct = data.find(item => item.id_product === id_product);

            if (existingProduct) {
                // El producto ya existe en el carrito, actualiza su información
                updateShoppingCar(existingProduct.id, existingProduct.Cantidad, existingProduct.Total, precio);
            } else {
                // El producto no está en el carrito, agrégalo
                addToShoppingCar(id_product, precio);
            }
        }
    })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });
}
async function addToShoppingCar(id_product,precio){
    const jss = {
        "id_user": JSON.parse(localStorage.getItem('userInfo')),
        "id_product": id_product,
        "Cantidad" :1,
        "Total": precio
    };

    await fetch('http://127.0.0.1:8000/api/RegistroCar', {
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
                title: '¡Añadido a tu carrito de compra!',
                html: `<div style="text-align: center;">"El libro ha sido agregado a tu carrito de compras.</div>`,
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });
}


async function updateShoppingCar(id,cantidad,total,precio){
    let tcantidad = cantidad+1;
    let ttotal = parseFloat(total)+parseFloat(precio);
    const jss = {
        "cantidad" :tcantidad,
        "total": ttotal
    };

    await fetch('http://127.0.0.1:8000/api/Shopping/Edit/'+id, {
        method: 'PUT',
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
                title: '¡Añadido a tu carrito de compra!',
                html: `<div style="text-align: center;">"Se ha agregado un libro mas a tu carrito.</div>`,
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
      });
}