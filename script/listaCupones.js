document.addEventListener('DOMContentLoaded', async function () {
    const tableBody = document.getElementById('bodyCupones');
    const tableBody2 = document.getElementById('bodyCupones2');
    let originalCupones = [];
    let prueba = '';


    try {
        const response = await fetch('http://127.0.0.1:8000/api/Cupones/' + JSON.parse(localStorage.getItem('userInfo')), {
            headers:{
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        });
        if (!response.ok) {
            console.error('Error al obtener la lista de usuarios:', response.status);
            return;
        }

        originalCupones = await response.json();

        // Limpiar el cuerpo de la tabla
        tableBody.innerHTML = '';
        tableBody2.innerHTML = '';


        // Función para agregar filas a la tabla
        function agregarFilas(cupones) {
        cupones.forEach((cupon, index) => 
        {
            
            if(cupon.percent == 0)
            {
                prueba = 'Reducción exacta del valor $';

                const row = tableBody2.insertRow();
                const cellTipo = row.insertCell(0);
                const cellValor = row.insertCell(1);
                const cellCreado = row.insertCell(2);
                const cellExpira = row.insertCell(3);

                // Rellenar las celdas con datos del usuario
                cellTipo.textContent = prueba;
                cellValor.textContent =  "$ " + cupon.value;
                cellCreado.textContent = obtenerFechaFormateada(cupon.create);
                cellExpira.textContent = obtenerFechaFormateada(cupon.expire);
                cellCreado.classList.add('ocultarLuego');
                cellExpira.classList.add('ocultarLuego');

            }

            if(cupon.percent != 0)
            {
                prueba = 'Reducción calculada total %';

                const row = tableBody.insertRow();
                const cellTipo = row.insertCell(0);
                const cellPorcentaje = row.insertCell(1);
                const cellCreado = row.insertCell(2);
                const cellExpira = row.insertCell(3);

                // Rellenar las celdas con datos del usuario
                cellTipo.textContent = prueba;
                cellPorcentaje.textContent = cupon.percent + " %";
                cellCreado.textContent = obtenerFechaFormateada(cupon.create);
                cellExpira.textContent = obtenerFechaFormateada(cupon.expire);
                cellCreado.classList.add('ocultarLuego');
                cellExpira.classList.add('ocultarLuego');
            }



        });
        }    

        // Mostrar todos los usuarios inicialmente
        agregarFilas(originalCupones);



        } catch (error) {
            console.error('Error en la solicitud de obtener cupones:', error);
        }
    });

function obtenerNombreMes(numeroMes) {
    const meses = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return meses[numeroMes];
}

function obtenerFechaFormateada(fecha) {
    let fechaObjeto = new Date(fecha);

    let dia = fechaObjeto.getDate();
    let mes = obtenerNombreMes(fechaObjeto.getMonth());
    let año = fechaObjeto.getFullYear();

    let fechaExpira = `${dia} de ${mes} del ${año}`;

    return fechaExpira;
}