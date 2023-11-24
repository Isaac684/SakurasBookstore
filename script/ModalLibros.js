

function mostrarInformacionLibro(event, data) {
    event.preventDefault();

    const libro = {
        titulo: data.name,
        precioOriginal: data.price,
        descripcion: data.description,
        imagen: "http://127.0.0.1:8000/api/files/" + data.image,
        code: data.code,
        year: data.year.toString(),
        editorial: data.editorial,
        genero: data.category,
        autor: data.author
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

function mostrarAlertaInicioSesion(event) {
    event.preventDefault();

    Swal.fire({
        icon: "error",
        iconColor: "#ED5584",
        title: "Oops...",
        footer: '<p class="">¿No tienes cuenta? <a href="../html/registro.html">Registrate aqui. </a></p>',
        html: 
        `
        <p class="text-center">Inicia sesión para tener acceso a todas las opciones.</p>
        `
      });

}

