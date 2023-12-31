document.addEventListener('DOMContentLoaded', async function() {
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
        let wishlistTable = document.getElementById('wishlist-table-body');
        // Iterar sobre los libros en la lista de deseos y agregarlos a la tabla
        let pago = 0.0;
        const totalAPagar = document.getElementById('totalPago');
        data.forEach(function(bookss) {
            
            verLista(bookss.id_product,wishlistTable,bookss.Cantidad, bookss.Total);
            pago += parseFloat(bookss.Total);
        });
        totalAPagar.textContent = 'TOTAL A PAGAR: $'+pago.toFixed(2);
    })
      .catch(error => {
        console.error('Error:', error);
      });

});

async function verLista(id_product,wishlist,cantidad,total){

    fetch('http://127.0.0.1:8000/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].id == id_product){
                    let row = wishlist.insertRow();
                    row.innerHTML = `
                    <td><img src="${data[i].image}" alt="" class="rounded-top-md align-self-center" width="60" height="95"></td>
                    <td><span class="titulo">${data[i].name}</span></td>
                    <td><span class="precio">$ ${data[i].sell_price}</span></td>
                    <td><span class="precio">${cantidad}</span></td>
                    <td><span class="precio">$ ${total}</span></td>
                    <td><button class="round-black-btn btn-dark" onclick="removeFromWishlist(${data[i].id})">Eliminar</button></td>
                    `;
                }
            }

        })
        .catch(function (err) {
            console.log(err);
        });

}

async function removeFromWishlist(id) {
    await fetch('http://127.0.0.1:8000/api/Shopping/Delete/' + JSON.parse(localStorage.getItem('userInfo')) + '/'+id, {
        method: 'DELETE',
        headers:{
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al rliminar el dato');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Recargar la página para reflejar los cambios en la interfaz de usuario
    location.reload();
}