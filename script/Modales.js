function mostrarCupon(event) {
    event.preventDefault();

    const cupon = {
        titulo: 'Canjea este cupón',
        porcentaje: '15%',
        imagen: '../img/logo22.png',
        descripcion: '¡Aplica este descuento maravilloso en tu proxima compra!',
        fecha: '31 de diciembre 2023'
    };
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    swal.fire({
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        heightAuto:false,
        width:'50%',
        position:'top-left',

        html: 
        `
        <article class="card2 fl-left">
          <section class="date">
            <time>
              <span>${cupon.porcentaje}</span><span>Discount</span>
            </time>
          </section>
          <section class="card-cont">
            <small>Cupón</small>
            <h3>Registrate y recibe un fabuloso descuento</h3>
            <div class="even-date">
            <i class="fa fa-calendar"></i>
            <time>
              <span>Expira: ${cupon.fecha}</span>
            </time>
            </div>
            <div class="even-info">
              <i class="fa fa-map-marker"></i>
            </div>
            <a href="../html/registro.html">Entrar</a>
          </section>
        </article>
        `,
    });
}

function mostrarCuponNavidad(event) {
  event.preventDefault();

  const cupon = {
      titulo: 'Canjea este cupón',
      porcentaje: '50%',
      imagen: '../img/logo22.png',
      descripcion: '¡En esta navidad, necesitas imaginación en tu vida, regala un libro!',
      fecha: '31 de diciembre 2023'
  };


  Swal.fire({
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    heightAuto: false,
    width: '65%',
    position: 'top',
    background: '#9D5C59',
    html:
        `
        <div class="fuente3 p-1 pt-0 pb-0">
            <div class="row">
                <div class="col-lg-6 col-xl-4 text-center" style="border-right-style:dashed; border-right-color: white;">
                    <img src="${cupon.imagen}" alt="${cupon.titulo}" style="width: 100%; max-height: 300px;">
                </div>
                <div class="col-lg-6 col-xl-8 text-white ps-4 text-center">
                    <h1 class="fuente1 text-center">${cupon.titulo}</h1>
                    <p class="text-white lh-0 mb-0 pb-0" style="font-size: 5rem;">${cupon.porcentaje} <small class="fs-6">off </small>  </p>
                    <p class="fs-4">${cupon.descripcion}</p>
                    <button class="btn btn-danger" id="btnRecibir">Recibir</button>
                </div>
            </div>
        </div>
        `,
});

document.getElementById('btnRecibir').addEventListener('click', async function () {

  var boton = document.getElementById("botoncanjear");

  if (boton.dataset.pressed == "false") {
    boton.dataset.pressed = "true";
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0
    const año = fecha.getFullYear();
  
  const fechaFormateada = `${dia}/${mes}/${año}`;
    const datosActualizados = {
      percent: 50,
      value: 0,
      create: fechaFormateada,
      expire: '30/11/2023',
      id_user: JSON.parse(localStorage.getItem('userInfo'))
    };
    try {
      // Hacer una solicitud de actualización a la API
      const response = await fetch('http://127.0.0.1:8000/api/Cupones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify(datosActualizados),
      });
  
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar los datos.');
      }
  
      // Si la solicitud fue exitosa, mostrar un modal de éxito
      Swal.fire({
        title: 'Cupon Obtenido!',
        text: 'Se ha agregado un cupon nuevo!',
        icon: 'success',
        customClass: {
          content: 'text-center'
        }
      });
  
    } catch (error) {
    }


  }
  else
  {
    Swal.fire({
      title: 'Cupon ya obtenido!',
      text: 'Ya canjeaste este cupón',
      icon: 'info',
      customClass: {
        content: 'text-center'
      }
    });
  }

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


function mostrarInformacionLibro(event, data) {
  event.preventDefault();
  const cantidad = document.querySelector('#cantidadPrueba')?.value ?? 1;
  let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
  if(idUser == ""){
    console.log('2');
    deseos = `onclick="addToWishlist('${data.name}', '${data.sell_price}', '${data.image}', '${data.stock}')"`;
    carrito = `onclick="agregarCarrito('${data.name}', '${data.sell_price}', '${data.image}', '${data.stock}', '${cantidad}')"`;
  }else{
    console.log('1');
    deseos = `onclick="addToWishlistUser('${data.id}')"`;
    carrito = `onclick="addShoppingCarUser('${data.id}', '${data.sell_price}',${cantidad})"`;
  }


  const libro = {
      titulo: data.name,
      precioOriginal: data.sell_price,
      descripcion: data.description,
      imagen: data.image,
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
              <div>
                  <svg style="cursor: pointer;" class="bi me-2 text-danger btn-add-to-wishlist favorito" ${deseos} width="30" height="24" fill="CurrentColor"><use href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#heart"/></svg>
                  <svg style="cursor: pointer;" class="bi me-2 carrito" width="30" height="24" ${carrito}><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#cart4"/></svg>
              </div>
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