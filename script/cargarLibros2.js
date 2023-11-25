
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

window.onload = includeContent('../html/plantillaLibros2.html', document.getElementById('MostrarLibros2'));
let contador = 0;

async function listarLibros2(index = 0) {

    fetch('http://127.0.0.1:8000/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(async function (data) {

            const contenedorLibros = document.getElementById('contenedor-libros');
            const libroSinDescuento = document.querySelector('.libroPNormal');
            const vote = document.getElementById('card-content');
            const stars = vote.querySelectorAll('.nmbr-box'); 
            const total = document.querySelector('.totalLibros2');

            // Verificar si hay más elementos en el JSON

            if (index < data.length) {

                stars.forEach( (e, i)=> {
                    if(i < data[index].rating){
                        e.classList.add('sel');
                    }
                    else
                    {
                        e.classList.remove('sel');
                    }
                    
                })

                let nuevoLibro;
                nuevoLibro = libroSinDescuento.cloneNode(true);
                nuevoLibro.style.display = ''; // Mostrar el nuevo libro

    


                // Actualizar contenido con la información del libro actual
                nuevoLibro.querySelector('#imagen').setAttribute('src', data[index].image);
                nuevoLibro.querySelector('#imagen').onclick = function(event) {
                    mostrarInformacionLibro(event, data[index]);
                };
                nuevoLibro.querySelector('.precio').textContent = "$" + data[index].sell_price;
                nuevoLibro.querySelector('.nombre').textContent = data[index].name;

                if(data[index].rating >= 4)
                {
                    contador++;
                    // Agregar el nuevo libro al contenedor de libros
                    contenedorLibros.appendChild(nuevoLibro);
                }

                total.textContent = contador + " Libros";
                // Llamar recursivamente para el siguiente libro
                listarLibros2(index+1);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

listarLibros2();