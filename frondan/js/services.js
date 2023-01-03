const token = JSON.parse(localStorage.getItem("token.users")) ?? [];
let user = token[1]['username']

const main = document.querySelector(".row");
const detalle = document.querySelector(".detalle");

async function getServices() {
  const id = new URLSearchParams(window.location.search).get("id");
  const extra = id ? `${id}/` : "";

  try {
    const response = await fetch(`http://127.0.0.1:8000/servicios/todos/${extra}`, {
      method: "GET",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token[token.length-2].access}`,
      }
      });
    const data = await response.json();
    id ? renderServicio(data) : renderServicios(data);
  } catch (error) {
    console.log(error);
  }
}

function renderServicios(data) {
  main.innerHTML = "";
 
  data.results.forEach((task) => {
    const fechaInicio = new Date(task.created_at).getTime();
    const fechaFin = new Date().getTime();
    const diff = fechaFin - fechaInicio;
    const format_date = Math.round(diff / (1000 * 60 * 60 * 24));
    const {name, description, logo, id} = task;
    main.innerHTML += `
    <div class="col-4">
      <div class="card mb-2">
        <div class="card-body">
          <h4>${name}</h2>
          <p align="justify">
            ${description}
          </p>
          <img src="${logo}" width="310" height="163"/>

          <div class="mt-2">
          <a href="services.html?id=${id}" class="btn btn-primary">Revisar</a>
          </div>
        </div>
      </div>
    </div>`;
  });
}

function renderServicio(data) {
    console.log(detalle)
  const {name, description : bodyTodo, logo,  id} = data;
  detalle.innerHTML = `
    <div class="card shadow">
        <div class="col-8 mx-auto  pt-2">
            <main>
                <h1>Detalle</h1>
                <p class="fs-5 col-md-6">
                    Servicio: ${name}
                </p>
                <p class="fs-5 col-md-8" align="justify">
                    Descripción:
                </p>
                <div class="mt-1"> ${bodyTodo} </div>
                <img src="${logo}" width="310" height="163"/>
                
                <div class="mt-2">
                    <div class="mb-5">
                        <a href="services.html" class="btn btn-primary">Regresar</a>
                        <a href="./edit.html?id=${id}" class="btn btn-primary">Editar</a>
                        <button onclick="deleteTodo()" class="btn btn-danger">Eliminar</button>
                    </div>
                </div>
            </main>
        </div>
    </div>`;
}


getServices();
