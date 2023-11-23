document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento select
    var selectPaises = document.getElementById("paises");

    // Obtener la lista de países desde el enlace
    fetch('https://sakuraapi.000webhostapp.com/api/paises')
      .then(response => response.json())
      .then(data => {
        // Iterar sobre el arreglo de países y agregar opciones al select
        data.forEach(function(pais) {
          var opcion = document.createElement("option");
          opcion.value = pais.nombre;
          opcion.text = pais.nombre;
          selectPaises.add(opcion);
        });
      })
      .catch(error => console.error('Error al obtener la lista de países:', error));
  });