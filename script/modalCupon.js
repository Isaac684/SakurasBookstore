


function mostrarCupon(event) {
    event.preventDefault();

    const libro = {
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
        width:'55%',
        position:'top',

        html: 
        `
        <article class="card2 fl-left">
        <section class="date">
          <time datetime="23th feb">
            <span>23</span><span>feb</span>
          </time>
        </section>
        <section class="card-cont">
          <small>dj khaled</small>
          <h3>corner obsest program</h3>
          <div class="even-date">
           <i class="fa fa-calendar"></i>
           <time>
             <span>wednesday 28 december 2014</span>
             <span>08:55pm to 12:00 am</span>
           </time>
          </div>
          <div class="even-info">
            <i class="fa fa-map-marker"></i>
          </div>
          <a href="#">tickets</a>
        </section>
      </article>
        `,
    });
}