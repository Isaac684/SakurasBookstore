

function mostrarInformacionLibro(event) {
    event.preventDefault();

    const libro = {
        titulo: 'Los Juegos del Hambre',
        precioOriginal: 25.99,
        descripcion: 'Cuando August Se Entera De Que Su Mejor Amigo Jack Muestra Signos De Enfermedad Mental, Hará Cualquier Cosa Para Ayudarlo. En Las Alucinaciones De Jack, El Rey De Mimbre Gobierna Un Mundo Alternativo. Mientras Su Amigo Los Guía En Una Búsqueda Para Cumplir Una Oscura Profecía En Este Mundo Paralelo, August Comienza A Cuestionar Qué Es Real ',
        imagen: '../img/libro.jpg',
        code: '978-98-7747-386-5',
        year:'2023',
        editorial:'Editorial Pollitos locos',
        autor: 'Potroclo Gomez'
    };

    

    swal.fire({
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        heightAuto:false,
        width:'80%',
        position:'center',

        html: 
        `
        <div class="fuente3 rounded-3 p-xl-2 p-5 pt-1" >
        <div class="row">

            <div class="col-lg-6 col-xl-4 text-center">
                <img src="${libro.imagen}" alt="${libro.titulo}" style="width: 90%; max-height: 90%;">
            </div>

            <div class="col-lg-6 col-xl-8">
                <h1 class="mb-3 fuente1 text-center">${libro.titulo}</h1>
                <p class="fs-6">${libro.descripcion}</p>
                <p class="mb-1 fs-6">Precio:</p>
                <p class="mb-1 fs-1">$${libro.precioOriginal}</p>
                <p class="mb-1 fs-6">ISBN: ${libro.code}</p>
                <p class="mb-1 fs-6">Autor: ${libro.autor}</p>
                <p class="mb-1 fs-6">Editorial: ${libro.editorial}</p>
                <p class="mb-1 fs-6">Año: ${libro.year}</p>
                <p class="mb-1 fs-6">Generos: </p>
                <p class="mb-1 fs-6 badge bg-danger">${libro.genero}</p>
            </div>

        </div>
    </div>
        `,
    });
}