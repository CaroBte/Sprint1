/*Para correr el cajero en consola, ejecuta runAtm() cuantas veces sea necesario =) */

console.log("Bienvenido al cajero")
console.log("Para transacciones ejecute 'runAtm()' ")

let cajero = [
    { billete5: 0 },
    { billete10: 0 },
    { billete20: 0 },
    { billete50: 0 },
    { billete100: 0 }
]

let usuarios = [
    {
        Nombre: "Caro",
        numDoc: 123,
        contrasena: 123,
        userType: 1
    },

    {
        Nombre: "Pedro",
        numDoc: 456,
        contrasena: 456,
        userType: 2
    }
]

let billetesIngresados = []

let contrasena = "";
let documento = "";

function logInfo() {
    documento = parseInt(prompt("Por favor, ingresa tu número de documento: "))
    contrasena = parseInt(prompt("Ingresa tu contraseña: "))
}

function ingresarDinero(nMil) {
    dineroIngresado = parseInt(prompt(`¿Cuántos billetes de ${nMil} desea ingresar?`))
    return dineroIngresado
}

function guardarDinero() {
    cajero[0].billete5 += ingresarDinero("5mil")
    cajero[1].billete10 += ingresarDinero("10mil")
    cajero[2].billete20 += ingresarDinero("20mil")
    cajero[3].billete50 += ingresarDinero("50mil")
    cajero[4].billete100 += ingresarDinero("100mil")
}

function multiplicarBilletes(elemento, nMil) {
    let billetesTotal = elemento * nMil
    console.log(`Hay ${billetesTotal} pesos en billetes de ${nMil}`)
    return billetesIngresados.push(billetesTotal)
}

let totalGeneral = 0;

function hacerAdmin() {
    totalGeneral = 0;
    guardarDinero();
    multiplicarBilletes(cajero[0].billete5, 5000)
    multiplicarBilletes(cajero[1].billete10, 10000)
    multiplicarBilletes(cajero[2].billete20, 20000)
    multiplicarBilletes(cajero[3].billete50, 50000)
    multiplicarBilletes(cajero[4].billete100, 100000)
    billetesIngresados.forEach((element) => {
        totalGeneral += element
    });
    console.log(`El dinero disponible es ${totalGeneral} pesos`);
}


function hacerCliente() {
    if (totalGeneral === 0) {
        alert("Cajero en mantenimiento. Vuelva pronto")
        runAtm()
    } else {
        alert("Bienvenido cliente")
        let dineroARetirar = parseInt(prompt("¿Cuánto dinero desea retirar?"))
        console.log(`El dinero disponible en el momento es:${totalGeneral}`)
        console.log(`Hay ${billetesIngresados[0]} disponible en billetes de 5mil`)
        console.log(`Hay ${billetesIngresados[1]} disponible en billetes de 10mil`)
        console.log(`Hay ${billetesIngresados[2]} disponible en billetes de 20mil`)
        console.log(`Hay ${billetesIngresados[3]} disponible en billetes de 50mil`)
        console.log(`Hay ${billetesIngresados[4]} disponible en billetes de 100mil`)

        dineroARetirar = (parseInt(dineroARetirar / 5000)) * 5000
        if (totalGeneral < dineroARetirar) {
            alert("Actualmente este cajero no cuenta con el dinero solicitado. Intente nuevamente")
            runAtm()
        } else {
            console.log("Retirando el dinero...")
            let transacciónCompletada = false
            let billetesEntregados = [0, 0, 0, 0, 0]
            totalGeneral = totalGeneral - dineroARetirar

            while (transacciónCompletada === false) {
                if (dineroARetirar >= 100000 && cajero[4].billete100 > 0) {
                    cajero[4].billete100 -= 1
                    dineroARetirar -= 100000
                    billetesEntregados[0] += 1
                } else if (dineroARetirar >= 50000 && cajero[3].billete50 > 0) {
                    cajero[3].billete50 -= 1
                    dineroARetirar -= 50000
                    billetesEntregados[1] += 1
                } else if (dineroARetirar >= 20000 && cajero[2].billete20 > 0) {
                    cajero[2].billete20 -= 1
                    dineroARetirar -= 20000
                    billetesEntregados[2] += 1
                } else if (dineroARetirar >= 10000 && cajero[1].billete10 > 0) {
                    cajero[1].billete10 -= 1
                    dineroARetirar -= 10000
                    billetesEntregados[3] += 1
                } else {
                    if (cajero[0].billete5 > 0) {
                        cajero[0].billete5 -= 1
                        dineroARetirar -= 5000
                        billetesEntregados[4] += 1
                    }
                }
                if (dineroARetirar === 0) {
                    transacciónCompletada = true
                }

            }

            console.log(`Quedan ${totalGeneral} pesos en el cajero`)
            console.log(`Quedan ${cajero[4].billete100 * 100000} disponible en billetes de 100mil`)
            console.log(`Quedan ${cajero[3].billete50 * 50000} disponible en billetes de 50mil`)
            console.log(`Quedan ${cajero[2].billete20 * 20000} disponible en billetes de 20mil`)
            console.log(`Quedan ${cajero[1].billete10 * 10000} disponible en billetes de 10mil`)
            console.log(`Quedan ${cajero[0].billete5 * 5000} disponible en billetes de 5mil`)
            console.log(`Se entregaron ${billetesEntregados[0]} de 100000`)
            console.log(`Se entregaron ${billetesEntregados[1]} de 50000`)
            console.log(`Se entregaron ${billetesEntregados[2]} de 20000`)
            console.log(`Se entregaron ${billetesEntregados[3]} de 10000`)
            console.log(`Se entregaron ${billetesEntregados[4]} de 5000`)

        }
    }
}

function runAtm() {
    logInfo()

    let user = ""

    usuarios.forEach(element => {
        if (documento === element.numDoc && contrasena === element.contrasena) {
            user = element.userType
        }

    });

    switch (user) {
        case 1:
            billetesIngresados.splice(0, 5)
            alert("Bienvenido administrador");
            hacerAdmin()
            break;
        case 2:
            hacerCliente()
            break;
        default:
            alert("Usuario o contraseña incorrecto, intente nuevamente")
            runAtm()
            break;
    }
}
