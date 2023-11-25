
function mostrarAlerta() {
    Swal.fire({
        title: '¡Pedido cancelado!',
        text: '¡Se ha retornado correctamente!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
 
 }
 async function dataShow(){
 
 
    const tbody = document.querySelector('[tbd]');
    let ars = "";
    await fetch('http://127.0.0.1:8000/api/Ventas/' + JSON.parse(localStorage.getItem('userInfo')), {
           headers:{
             'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
           }
         })
         .then(response => {
           if (!response.ok) {
             throw new Error('Hubo un problema al enviar los datos.');
           }
           return response.json();
         })
         .then(function(data) {
            data.forEach(element => {
                const jss = {
                    "data":[
                        {
                        "typeSearch": "id",
                        "varSearch": element.id_product
                        }
                    ]
                }
                 fetch('http://127.0.0.1:8000/api/Busqueda',{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(jss)
                }).then(response_ => {
                return response_.json();
                })
                .then(function(data_){
                    const tr = document.createElement('tr');
                    if(element.created_at != null){
                      if(minLimit(element.created_at)){
                        
                        tr.innerHTML = `
                                <td>` + DateFormat(element.created_at) + `</td>
                                <td>` + data_[0].name + `</td>
                                <td>` + element.units + `</td>
                                <td>$` + element.unit_price + `</td>
                                <td>$` + element.sub_total + `</td>
                        `;
                        const td = document.createElement('td');
                        const btn = document.createElement('button');
                        btn.classList.add('btn','btn-danger');
                        btn.textContent = "Cancelar";
                        btn.addEventListener('click', async function(){
                            await fetch('http://127.0.0.1:8000/api/Ventas/' + element.id, {
                              method: 'DELETE',
                            headers:{
                                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                              }
                            })
                            .then(response => {
                              if (!response.ok) {
                                throw new Error('Hubo un problema al borrar los datos.');
                              }
                              return response.json();
                            })
                            .then(data => {
                              console.log(data);
                              window.location.reload();
                            })
                            .catch(error => {
                              console.error('Error:', error);
                            });

                        })
                        td.appendChild(btn);
                        tr.appendChild(td);

                      }else{
                        tr.innerHTML = `
                                <td>` + DateFormat(element.created_at) + `</td>
                                <td>` + data_[0].name + `</td>
                                <td>` + element.units + `</td>
                                <td>$` + element.unit_price + `</td>
                                <td>$` + element.sub_total + `</td>
                        `;

                      }

                    }else{
                      tr.innerHTML = `
                              <td>` + DateFormat(element.created_at) + `</td>
                              <td>` + data_[0].name + `</td>
                              <td>` + element.units + `</td>
                              <td>$` + element.unit_price + `</td>
                              <td>$` + element.sub_total + `</td>
                      `;
                    };
                        tbody.appendChild(tr);
                })
                .catch(error => {
                console.error('Error:', error);
                // Manejo de errores
                });

            });
         })
         .catch(error => {
           console.error('Error:', error);
           // Manejo de errores
         });
 
 }
 dataShow();
 function DateFormat(fecha) {
  let fechaObjeto = new Date(fecha);

  const dia = fechaObjeto.getDate();
  const mes = obtenerNombreMes(fechaObjeto.getMonth());
  const año = fechaObjeto.getFullYear();

  const fechaExpira = `${dia} de ${mes} del ${año}`;
  
  return fechaExpira;
}
function obtenerNombreMes(numeroMes) {
  const meses = [
      "enero", "febrero", "marzo", "abril",
      "mayo", "junio", "julio", "agosto",
      "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return meses[numeroMes];
}
function minLimit(fecha){
  let fechaObjeto = new Date(fecha);
  let fechaActual = new Date();
  if((Math.floor(((fechaActual.getTime() - fechaObjeto.getTime())/1000)/60)) <= 5){
    alert;
    return true;
  }
  return false;
}