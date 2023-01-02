const token = JSON.parse(localStorage.getItem("token.users")) ?? [];
let user = token[1]['username']


const main_pagos = document.querySelector("#pagos");
const main_vencidos = document.querySelector("#vencidos");
const divUsername = document.querySelector('#username');

function renderUser(user){
    divUsername.innerHTML = ` <a href="#" class="nav-item nav-link"><i class="fa-solid fa-user me-2"></i>@${user}</a>`
}
renderUser(user)
// Pagos Realizados
async function getPagos() {

    try {
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
        
    } catch (error) {
        console.log("Inicie Sesión")
        window.location.href="index.html"
    }
 
  
}

function renderPagos(data) {
main_pagos.innerHTML = "<h3 class='text-light'>Pagos realizados</h3>";
data.results.forEach((pago) => {
const {service_id, logo, id, paymentdate, amount} = pago;
main_pagos.innerHTML += `    

    <div class="card m-2 rounded-pill">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col">
                    <img class="img_logo_servicio" src="${logo}"/>
                </div>
                <div class="col">
                    ${service_id}
                </div>
                <div class="col">
                    ${paymentdate}
                </div>
                <div class="col">
                    ${amount}
                </div>
            </div>
        </div>
    </div>


`;
  });
}

getPagos()

// Pagos Vencidos

async function getVencidos() {
  
    const response =await fetch('http://127.0.0.1:8000/servicios/expiraciones/', {
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
    main_vencidos.innerHTML = "<h3 class='text-light'>Pagos vencidos</h3>";
    data.results.forEach((pago) => {
    const {payment_service_logo, payment_service_name, payment_service_expiration, payment_service_amount,penalty_fee} = pago;
    main_vencidos.innerHTML += `    
    <div class="card m-2 rounded-pill">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col">
                    <img class="img_logo_servicio" src="${payment_service_logo}"/>
                </div>
                <div class="col">
                    ${payment_service_name}
                </div>
                <div class="col">
                    ${payment_service_expiration}
                </div>
                <div class="col">
                    ${payment_service_amount} USD
                </div>
                <div class="col">
                    ${penalty_fee} USD
                </div>
            </div>
        </div>
    </div>
    
    
    `;
        });
    }
    
getVencidos();


