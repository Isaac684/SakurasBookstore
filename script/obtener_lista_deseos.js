document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la lista de deseos desde localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


    // Obtener la tabla de deseos en el segundo HTML
    let wishlistTable = document.getElementById('wishlist-table-body');

    // Iterar sobre los libros en la lista de deseos y agregarlos a la tabla
    wishlist.forEach(function(book) {
        let row = wishlistTable.insertRow();
        row.innerHTML = `
            <td><img src="${book.imageUrl}" alt="" class="rounded-top-md align-self-center" width="60" height="95"></td>
            <td><span class="titulo">${book.title}</span></td>
            <td><span class="precio">${book.price}</span></td>
            <td><button class="round-black-btn btn-dark" onclick="addToCart('${book.title}', '${book.price}')">Añadir al carrito</button></td>
            <td><button class="round-black-btn btn-dark" onclick="removeFromWishlist('${book.title}')">Eliminar</button></td>
        `;
    });
});

// Función para eliminar un libro de la lista de deseos
function removeFromWishlist(title) {
    // Recuperar la lista de deseos desde localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filtrar la lista de deseos para excluir el libro con el título proporcionado
    wishlist = wishlist.filter(book => book.title !== title);

    // Actualizar la lista de deseos en localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Recargar la página para reflejar los cambios en la interfaz de usuario
    location.reload();
}

var urls = [
    {text: "heart", url: "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#heart"},
    {text: "heart fill", url: "../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#heart-fill"}
  ];

function href()
{
      var data = urls.reverse()[0]; // el dice 0 pasa al indice 1 y viceversa.
      document.getElementById('nose').href= data.url;
  }