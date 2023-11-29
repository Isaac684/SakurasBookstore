async function addShoppingCarUser(id_product, precio, cantidad, stock) {
  //console.log('2');
  await fetch('http://127.0.0.1:8000/api/Show/' + JSON.parse(localStorage.getItem('userInfo')), {
    headers: {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
  })
    .then(response => {

      if (!response.ok) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        //console.log('34')
        if(stock < cantidad){
          Swal.fire({
            icon: 'warning',
            title: 'La cantidad ingresada es mayor al stock!',
            html: `<div style="text-align: center;">El libro seleccionado tiene solamene ${stock} libros en stock.</div>`,
        });  
        }else{
          addToShoppingCar(id_product, precio, cantidad);
        }
        


      } else {
        console.log(data);
        const existingProduct = data.find(item => item.id_product == id_product);
         
        if (existingProduct) {
          let cantidadIngreso= cantidad+existingProduct.Cantidad;
          if(stock < cantidadIngreso){
            Swal.fire({
              icon: 'warning',
              title: 'La cantidad ingresada es mayor al stock!',
              html: `<div style="text-align: center;">El libro seleccionado tiene solamene ${stock} libros en stock.</div>`,
          });  
          }else{
            updateShoppingCar(existingProduct.id, cantidad, existingProduct.Total, precio, existingProduct.Cantidad);
          }
          
        } else {
          // El producto no está en el carrito, agrégalo
          
          if(stock < cantidad){
            Swal.fire({
              icon: 'warning',
              title: 'La cantidad ingresada es mayor al stock!',
              html: `<div style="text-align: center;">El libro seleccionado tiene solamene ${stock} libros en stock.</div>`,
          });  
          }else{
            addToShoppingCar(id_product, precio, cantidad);
          }
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejo de errores
    });
}
async function addToShoppingCar(id_product, precio, cantidad) {
  let totalS = cantidad * precio;
  const jss = {
    "id_user": JSON.parse(localStorage.getItem('userInfo')),
    "id_product": id_product,
    "Cantidad": cantidad,
    "Total": totalS
  };

  await fetch('http://127.0.0.1:8000/api/RegistroCar', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    },
    body: JSON.stringify(jss)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
      return response.json();
    })
    .then(data => {
      if (data.res) {
        Swal.fire({
          icon: 'success',
          title: '¡Añadido al carrito de compras!',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
                <a class="nav-link" aria-current="page" href="../html/carritoUser.html">Ir al carrito</a>
                `,
          cancelButtonText: `
                  Seguir comprando
                `,
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejo de errores
    });
}


async function updateShoppingCar(id, cantidad, total, precio, cantidadAct) {
  console.log(cantidadAct);
  let tcantidad = parseInt(cantidad) + parseInt(cantidadAct);
  let ttotal = parseFloat(total) + (parseFloat(precio) * cantidad);
  const jss = {
    "cantidad": tcantidad,
    "total": ttotal
  };

  await fetch('http://127.0.0.1:8000/api/Shopping/Edit/' + id, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    },
    body: JSON.stringify(jss)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
      return response.json();
    })
    .then(data => {
      if (data.res) {
        Swal.fire({
          icon: 'success',
          title: '¡Han añadido ' + cantidad + ' mas al carrito!',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
                <a class="nav-link" aria-current="page" href="../html/carritoUser.html">Ir al carrito</a>
                `,
          cancelButtonText: `
                  Seguir comprando
                `,
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejo de errores
    });
}