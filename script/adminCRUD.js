function addProduct() {
    document.getElementById('bookForm').addEventListener('submit', function(event) {
        event.preventDefault();
  
        const formData = new FormData();
        formData.append('code', document.getElementById('code').value);
        formData.append('name', document.getElementById('name').value);
        formData.append('editorial', document.getElementById('editorial').value);
        formData.append('author', document.getElementById('author').value);
        formData.append('year', parseInt(document.getElementById('year').value));
        formData.append('category', document.getElementById('category').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', parseFloat(document.getElementById('price').value));
        formData.append('sell_price', parseFloat(document.getElementById('sellPrice').value));
        formData.append('stock', parseInt(document.getElementById('stock').value));
        formData.append('id_provider', 1); // Debes obtener el ID del proveedor de alguna manera
        formData.append('rating', 4);
        formData.append('file', document.getElementById('file').files[0]);
  
        fetch('http://127.0.0.1:8000/api/RegistroProductos', {
          method: 'POST',
          headers:{
            'Authorization' : 'Bearer 8|i7uDLsJ2hiD1v5PnCJlFISKfXLWGQl1wP99wmVSjb8a67921'
          },
          body: formData,
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al enviar los datos.');
          }
          return response.json();
        })
        .then(data => {
          console.log('Datos enviados correctamente:', data);
          document.getElementById('bookForm').reset();

          Swal.fire({
            icon: 'success',
            title: '¡Añadido a los productos!',
            html: `<div style="text-align: center;">Producto ha sido agregado al dispensador.</div>`,
        });
          // Puedes hacer algo con la respuesta del servidor si es necesario
        })
        .catch(error => {
          console.error('Error:', error);
          // Manejo de errores
        });
      });

}