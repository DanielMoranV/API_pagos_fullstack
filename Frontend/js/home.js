const token = JSON.parse(localStorage.getItem("token.users")) ?? [];

const main_pagos = document.querySelector("#pagos");
const main_vencidos = document.querySelector("#vencidos");

// Pagos Realizados

async function getPagos() {
 
  let response = await fetch('http://127.0.0.1:8000/servicios/pagos/', {
    method: "GET",
    mode: "cors",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token[token.length-2].access}`,
      }
  });
  let data = await response.json();
  renderPagos(data);
}

function renderPagos(data) {
main_pagos.innerHTML = "<h3 >Pagos realizados</h3>";
data.results.forEach((pago) => {
const {logo, service_id, paymentdate, amount} = pago;
main_pagos.innerHTML += `    
<div class="col-13">
    <div class="card mb-2" id="inside">
        <div class="card-body" id="outside">
            <table>
                <tr>
                    <th scope="col"> <img src="${logo}"/> <th>
                    <p> ${service_id}</p>
                    <th> 
                    <p class="fecha">${paymentdate}</th>
                    <th>
                    <p class="monto">${amount} USD</p>
                </tr>          
            </table>
        </div>
    </div>
</div>`;
  });
}

getPagos()

// Pagos Vencidos

async function getVencidos() {
  
    let response = await fetch('http://127.0.0.1:8000/servicios/expiraciones/', {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token[token.length-2].access}`,
          }
        });
    
        
        let data = await response.json();
        renderVencidos(data);
    }

function renderVencidos(data) {
    main_vencidos.innerHTML = "<h3>Pagos vencidos</h3>";
    data.results.forEach((pago) => {
    const {payment_service_logo, payment_service_name, payment_service_expiration, payment_service_amount,penalty_fee} = pago;
    main_vencidos.innerHTML += `    
    <div class="col-13">
        <div class="card mb-2" id="inside">
            <div class="card-body" id="outside2" >
                <table class="table2">
                    <tr>
                        <th scope="col"> <img src="${payment_service_logo}"/> <th>
                        <p>${payment_service_name}</p>
                        <th> 
                        <p class="fecha">${payment_service_expiration}</th>
                        <th>
                        <p class="monto1">${payment_service_amount} USD</p>
                        <th>
                        <p class="monto2">${penalty_fee} USD</p>
                    </tr>          
                </table>
            </div>
        </div>
    </div>`;
        });
    }
    
getVencidos();

