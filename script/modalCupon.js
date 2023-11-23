


function mostrarCupon(event) {
    event.preventDefault();

    const cupon = {
        titulo: 'Canjea este cupón',
        porcentaje: '15%',
        imagen: '../img/logo22.png',
        descripcion: '¡Aplica este descuento maravilloso en tu proxima compra!',
        fecha: '31 de diciembre 2023'
    };

    

    swal.fire({
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        heightAuto:false,
        width:'50%',
        position:'top',

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

  

  swal.fire({
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      heightAuto:false,
      width:'65%',
      position:'top',
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
                <button class="btn btn-danger"">Recibir</button>
            </div>

          </div>
       </div>
      `,
  });
}