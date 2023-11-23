function includeContent(url, targetElement) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            targetElement.innerHTML += xhr.responseText;
        }
    };
    xhr.send();
}

function listarLibros(index = 0) {
    fetch('https://sakuraapi.000webhostapp.com/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const contenedorLibros = document.getElementById('contenedor-libros');
            const libroTemplate = document.querySelector('.libro');

            // Verificar si hay más elementos en el JSON
            if (index < data.length) {
                // Clonar el elemento de plantilla para el nuevo libro
                const nuevoLibro = libroTemplate.cloneNode(true);
                nuevoLibro.style.display = ''; // Mostrar el nuevo libro

                // Actualizar contenido con la información del libro actual
                nuevoLibro.querySelector('.imagen').setAttribute('src', data[index].image);
                nuevoLibro.querySelector('.precio').textContent = data[index].sell_price;
                nuevoLibro.querySelector('.nombre').textContent = data[index].name;

                // Agregar el nuevo libro al contenedor de libros
                includeContent('../html/footerLogin.html', document.getElementById('footer-container'));
                
                // Llamar recursivamente para el siguiente libro
                listarLibros(index + 1);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// Llamar a la función para comenzar el proceso
listarLibros();