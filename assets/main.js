let auxilioTransporte = 0; //se va calcular el aux tranporte
let alta = 0; //se calcula la prima mas alta
let baja = 999_999_999; //este se usa para el valor mas bajo
let total = 0; //se calcula todo
let prima = 0; //se calcula prima
let nombreMayor = ""; //se saca el nombre con mayor prima
let nombreMenor = ""; //se saca el nombre con menor prima
let promedio = 0;
let contador = 0;

const SALARIOMINIMO = 828_116; //se usa para una condicional
//selecciona elemento por ID. botones
const FORM = document.getElementById("formulario");
const INFORMACION = document.getElementById("opciones");
const LISTADO = document.getElementById("listado");

//para añadir eventos y realiza la funcion que esta al final
INFORMACION.addEventListener("click", getInformacion);
FORM.addEventListener("submit", guardarEmpleado);
LISTADO.addEventListener("click", getEmpleado);

//funciones
function guardarEmpleado(e) {
    e.preventDefault();

    const NOMBRE = document.getElementById("nombre");
    let nombre = NOMBRE.value;
    let cedula = document.getElementById("numeroDocumento").value;
    let salario = document.getElementById("salario").value;
    let diasTrabajados = document.getElementById("diasTrabajo").value;

  if (salario < parseInt(SALARIOMINIMO * 2)) {
    auxilioTransporte = 97_032;
    salario = parseInt(salario) + parseInt(auxilioTransporte);
}
    if (diasTrabajados <= 179) {
        prima = parseInt((salario * diasTrabajados) / 360); //calcula los dias * el salario
    } else if (diasTrabajados == 180) {
        prima = parseInt(salario / 2);
    } else {
        alert("se supera los dias del semestre ");
    }

let empleado = {
    nombre,
    cedula,
    salario,
    diasTrabajados,
    prima,
    auxilioTransporte,
        };

    if (empleado.nombre != "") {
        if (localStorage.getItem("empleados") === null) {
        //compara lo que se guarda y valida si esta nulo

        let empleados = [];
        empleados.push(empleado);
        localStorage.setItem("empleados", JSON.stringify(empleados)); //permite adentrar un arreglo en otro para que permitan mas empleados
        } else {
        let empleados = JSON.parse(localStorage.getItem("empleados"));
        empleados.push(empleado);
        localStorage.setItem("empleados", JSON.stringify(empleados));
        }
    }else {
    alert("Verifique bien la información");
    }
    FORM.reset();
    getEmpleado();
}

function getEmpleado() {
    let empleados = JSON.parse(localStorage.getItem("empleados"));

    const empleadosView = document.getElementById("empleados");
    empleadosView.innerHTML = "";

    if (empleados != null) {
    for (let i = 0; i < empleados.length; i++) {
      //recorre todos los datos de los empleados
        let nombre = empleados[i].nombre;
        let cedula = empleados[i].cedula;
        let salario = empleados[i].salario;
        let auxilioTransporte = empleados[i].auxilioTransporte;
        let prima = empleados[i].prima;
        let diasTrabajados = empleados[i].diasTrabajados;

    empleadosView.innerHTML += `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Nombre empleado</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Salario</th>
                        <th scope="col">Auxilio transporte</th>
                        <th scope="col">Prima de servicios</th>
                        <th scope="col">Dias trabajados</th>
                        <th scope="col">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${nombre}</td>
                        <td>${cedula}</td>
                        <td>${salario}</td>
                        <td>${auxilioTransporte}</td>
                        <td>${prima}</td>
                        <td>${diasTrabajados}</td>
                        <td> <a class="btn btn-danger float-end" onclick="deleteEmpleado('${nombre}')">Eliminar</a></td>
                    </tr>
                </tbody>
            </table>`;
    }
}
}

function deleteEmpleado(nombre) {
    let empleados = JSON.parse(localStorage.getItem("empleados"));

    for (let i = 0; i < empleados.length; i++) {
    let nombreEmpleado = empleados[i].nombre;
    if (nombre == nombreEmpleado) {
    empleados.splice(i, 1);
    }
}
    localStorage.setItem("empleados", JSON.stringify(empleados));
    getEmpleado();
}

function getInformacion(e)
{
    let empleados = JSON.parse(localStorage.getItem("empleados"));

    const empleadosView = document.getElementById("empleados");
    empleadosView.innerHTML = "";

    if (empleados != null)
    {
        for (let i=0; i < empleados.length; i++) 
        {
            let nombre = empleados[i].nombre;
            let prima = empleados[i].prima;

            contador++;//cuantos empleados hay

            if (prima > alta){
                alta = prima;
                nombreMayor = nombre;
            }
            if (prima < baja){
                baja = prima;
                nombreMenor = nombre;
            }
            total = parseInt(total) + parseInt(prima);
            promedio = parseInt(total) / parseInt(contador);

        }
        empleadosView.innerHTML += `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Promedio</th>
                    <th scope="col">Total</th>
                    <th scope="col">Mayor</th>
                    <th scope="col">Menor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${promedio}</td>
                    <td>${total}</td>
                    <td>${nombreMayor}</td>
                    <td>${nombreMenor}</td>
                </tr>
            </tbody>
        </table>`;
    }
}
