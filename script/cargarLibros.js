async function listarLibros(index = 0) {

    await fetch('http://127.0.0.1:8000/api/Productos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        data.forEach(element_ => {
            const contenedorLibros = document.getElementById('contenedor-libros');
            const libroSinDescuento = document.querySelector('.libroPNormal');
            const libroConDescuento = document.querySelector('.libroPDescuento');
            const total = document.querySelector('.totalLibros');
            // Verificar si hay más elementos en el JSON
                // Clonar el elemento de plantilla para el nuevo libro
                //let nuevoLibro = libroSinDescuento.cloneNode(true);
                let nuevoLibro;

                if (element_.sell_price <= 25.0) {
                    nuevoLibro = libroSinDescuento.cloneNode(true);
                } else {
                    nuevoLibro = libroConDescuento.cloneNode(true);
                    const descuento = (element_.sell_price * 1) + (element_.sell_price * 0.30);
                    nuevoLibro.querySelector('.descuento').textContent = "$" + descuento.toFixed(2);
                }
                nuevoLibro.style.display = ''; // Mostrar el nuevo libro

                // Actualizar contenido con la información del libro actual
                nuevoLibro.querySelector('#imagen').setAttribute('src', element_.image);
                nuevoLibro.querySelector('#imagen').onclick = function(event) {
                    mostrarInformacionLibro(event, element_);
                };
                nuevoLibro.querySelector('.precio').textContent = "$" + element_.sell_price;
                nuevoLibro.querySelector('.nombre').textContent = element_.name;
                
                nuevoLibro.querySelector('.nombre').onclick = function(event) {
                    mostrarInformacionLibro(event, element_);
                };
                nuevoLibro.querySelector('.favorito').onclick = async function(event) {
                    let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                    if(idUser == ""){
                        addToWishlist(element_.name, element_.sell_price, element_.image, element_.stock);
                    }else{
                        console.log('1');
                        addToWishlistUser(element_.id);
                    }
                    
                };
                nuevoLibro.querySelector('.carrito').onclick = function(event) {
                    let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                    if(idUser == ""){
                        const cantidad = nuevoLibro.querySelector('#cantidadPrueba')?.value ?? 1;
                        agregarCarrito(element_.name, element_.sell_price, element_.image, element_.stock, cantidad);
                    }else{
                        addShoppingCarUser(element_.id, element_.sell_price);
                    }
                
                };
                // Agregar el nuevo libro al contenedor de librosç
                contenedorLibros.appendChild(nuevoLibro);

                // Llamar recursivamente para el siguiente libro
                total.textContent = data.length + " Libros";
        });
    })
        .catch(function (err) {
            console.log(err);
        });
}

// Llamar a la función para comenzar el proceso
    listarLibros();
const btn_filtro = document.querySelector('[filtrar]');
btn_filtro.addEventListener('click', function(){
    
    const contenedorLibros = document.getElementById('contenedor-libros');
    contenedorLibros.innerHTML = `
    <!-- Card -->
    <div class="col libroPNormal" style="display: none;">
        <div class="card border-0 fuente3">
            <img id="imagen" src="../img/libro.jpg" alt="" class="align-self-center " width="200px" height="290" style="cursor: pointer;">
            <!-- Card Body -->
            <div class="card-body">
                <div class="d-flex justify-content-around align-items-center mb-2">
                    <span class="badge bg-success"></span>
                    <div>
                        <svg style="cursor: pointer;" class="bi me-2 text-danger btn-add-to-wishlist favorito" width="30" height="24" fill="CurrentColor"><use href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#heart"/></svg>
                        <svg style="cursor: pointer;" class="bi me-2 carrito" width="30" height="24"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#cart4"/></svg>
                    </div>
                </div>
                <h6 class="mb-1 text-center">
                    <span class="text-decoration-line-through text-danger"></span>
                    <span class="fw-bold precio">$21.00</span>
                    <a href="../course-single.html" class="nav-link nombre">
                        Hush Hush
                    </a>
                </h6>
            </div>
    
        </div>
    </div>
    
    <!-- Card -->
    <div class="col libroPDescuento" style="display: none;">
        <div class="card border-0 fuente3">
            <img id="imagen" src="../img/libro.jpg" alt="" class="align-self-center " width="200px" height="290" style="cursor: pointer;">
    
            <div class="card-body">
                <div class="d-flex justify-content-around align-items-center mb-2">
                    <span class="badge bg-success">-30%</span>
                    <div>
                        <svg style="cursor: pointer;" class="bi me-2 text-danger btn-add-to-wishlist favorito" width="30" height="24" fill="CurrentColor"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#heart"/></svg>
                        <svg style="cursor: pointer;" class="bi me-2 carrito" width="30" height="24"><use xlink:href="../style/bootstrap-icons-1.11.1/bootstrap-icons.svg#cart4"/></svg>
                    </div>
                </div>
                <h6 class="mb-1 text-center">
                    <span class="text-decoration-line-through text-danger">$25.99</span>
                    <span class="fw-bold precio">$18.20</span>
                    <a href="../course-single.html" class="nav-link nombre">
                        Los Juegos del Hambre
                    </a>
                </h6>
            </div>
        </div>
    </div>

    `;
    setTimeout(function () {
        listarSeleccion(index = 0);
    }, 2000);
})

async function listarSeleccion(index = 0) {

    let jss = {
        "data":[
            {
            "typeSearch": "category",
            "varSearch": "-"
            },
            {
            "typeSearch": "sell_price",
            "varMin": "-2",
            "varMax": "-1"
            },
            {
            "typeSearch": "year",
            "varMin": "0",
            "varMax": "0"
            },
            {
            "typeSearch": "author",
            "varSearch": "."
            },
            {
            "typeSearch": "editorial",
            "varSearch": "."
            }
        ]
    }
    const gender = document.getElementsByName('radioGender');
    gender.forEach(element => {
        if(element.checked){
            jss.data[0].varSearch = element.value;
        }        
    });

    const autor = document.getElementsByName('radioAutor');
    autor.forEach(element => {
        if(element.checked){
            jss.data[3].varSearch = element.value;
        }        
    });
    const editorial = document.getElementsByName('radioEditorial');
    editorial.forEach(element => {
        if(element.checked){
            jss.data[4].varSearch = element.value;
        }        
    });

    const priceMax = document.querySelector('[priceMax]');
    const priceMin = document.querySelector('[priceMin]');
    if(priceMax.value != "" & priceMin.value != ""){
        jss.data[1].varMax = priceMax.value;
        jss.data[1].varMin = priceMin.value;
    }

    const yearMax = document.querySelector('[yearMax]');
    const yearMin = document.querySelector('[yearMin]');
    if(yearMax.value != "" & yearMin.value != ""){
        jss.data[2].varMax = yearMax.value;
        jss.data[2].varMin = yearMin.value;
    }
    console.log(jss);
        await fetch('http://127.0.0.1:8000/api/Busqueda',{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(jss)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                console.log(data);
            data.forEach(element_ => {
                const contenedorLibros = document.getElementById('contenedor-libros');
                const libroSinDescuento = document.querySelector('.libroPNormal');
                const libroConDescuento = document.querySelector('.libroPDescuento');
                const total = document.querySelector('.totalLibros');
                // Verificar si hay más elementos en el JSON
                    // Clonar el elemento de plantilla para el nuevo libro
                    //let nuevoLibro = libroSinDescuento.cloneNode(true);
                    let nuevoLibro;

                    if (element_.sell_price <= 25.0) {
                        nuevoLibro = libroSinDescuento.cloneNode(true);
                    } else {
                        nuevoLibro = libroConDescuento.cloneNode(true);
                    }
                    nuevoLibro.style.display = ''; // Mostrar el nuevo libro

                    // Actualizar contenido con la información del libro actual
                    nuevoLibro.querySelector('#imagen').setAttribute('src', element_.image);
                    nuevoLibro.querySelector('#imagen').onclick = function(event) {
                        mostrarInformacionLibro(event, element_);
                    };
                    nuevoLibro.querySelector('.precio').textContent = "$" + element_.sell_price;
                    nuevoLibro.querySelector('.nombre').textContent = element_.name;
                    nuevoLibro.querySelector('.favorito').onclick = async function(event) {
                        let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                        if(idUser == ""){
                            addToWishlist(element_.name, element_.sell_price, element_.image, element_.stock);
                        }else{
                            console.log('1');
                            addToWishlistUser(element_.id);
                        }
                        
                    };
                    nuevoLibro.querySelector('.carrito').onclick = function(event) {
                        let idUser = JSON.parse(localStorage.getItem('userInfo')) || "";
                        if(idUser == ""){
                            agregarCarrito(element_.name, element_.sell_price, element_.image, element_.stock);
                        }else{
                            addShoppingCarUser(element_.id, element_.sell_price);
                        }
                    
                    };
                    // Agregar el nuevo libro al contenedor de libros
                    contenedorLibros.appendChild(nuevoLibro);

                    // Llamar recursivamente para el siguiente libro
                    total.textContent = data.length + " Libros";
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}
