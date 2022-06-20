window.onload = function() {
    const display = document.getElementById("textoPantalla"); //Visor de la calculadora.
    const keypadButtons = document.getElementsByTagName("button"); //Botones
    const keypadButtonsArray = Array.from(keypadButtons); //Array de todos los botones

    //Para cada botón, si se lo clickea, calculadora()
    keypadButtonsArray.forEach((button) => {
        button.addEventListener("click", () => {
            calculadora(button, display);

        })
    })
}

// Declaración de los estados, para determinar si se puede o no poner un operador o coma.

var operando = 0;
var coma = 0;
var resultado = 0;

/*Funcionamiento de la calculadora:
Caso "C"  => Borra el display (lo pone en cero),
Caso "CE" => Borra el último dígito del display,
Caso "="  => Evalúa (calcula) el display y lo muestra en pantalla,
Default (Todos los otros botones)   => Actualiza el display
*/

function calculadora(button, display){
    switch (button.innerHTML){
        case "C":
            borrar(display);
            break;
        case "CE":
            borrarUltimo(display);
            break;
        case "=":
            calcular(display);
            break;
        default:
            actualizar(display, button);
            break;
    }
}

function calcular(display){
    let numero = eval(display.innerHTML);  //Eval toma el string y lo evalua "2+2" => 2+2 => 4
    let numStringLength = numero.toString().length; //Convierte el número en string para evaluar su length

    //Si el número es entero y tiene más de 13 cifras, alert: El número excede el display
    if(Number.isInteger(numero) && numStringLength > 10){
        alert("El número excede el display");
        display.innerHTML = 0;

    //Si el número es entero y no tiene más de 13 cifras, poner el número en el display
    }else if(Number.isInteger(numero) && numStringLength <= 13){
        display.innerHTML = numero;

    //Si el número no es entero y tiene más de 13 cifras, truncar a 4 cifras después de la coma
    }else if(! Number.isInteger(numero) && numStringLength > 13){
        display.innerHTML = numero.toFixed(4);

    //El número no es entero pero tiene menos de 13 cifras, entonces poner en el display
    }else{
        display.innerHTML = numero;  
    }
    //Cambia resultado a 1 para indicar que en el display se está mostrando un resultado

    resultado = 1;
}

//Se fija si: operando está en estado cero (0), el display es distinto de cero y que el último dígito del display no sea ni un operador ni una coma. En ese caso devuelve true, para ser usado en "actualizar"
// (PonerOperador solo se creó para ahorrar código)
function ponerOperador(display){
    if (
    operando == 0 && display.innerHTML != 0  && 
    display.innerHTML.charAt(display.innerHTML.length-1) != "+" && 
    display.innerHTML.charAt(display.innerHTML.length-1) != "-" && 
    display.innerHTML.charAt(display.innerHTML.length-1) != "*" && 
    display.innerHTML.charAt(display.innerHTML.length-1) != "/" &&
    display.innerHTML.charAt(display.innerHTML.length-1) != "." 
    ){
        return true;
    }
    return false
}

function actualizar(display, button){

    //Comienza preguntando si el display tiene menos de 13 dígitos, si es menor la calculadora funciona
    if(display.innerHTML.length < 13){    
        //Si se presiona una coma (.) y el display está en cero (0), el display cambia a ".", es decir, comienza un número decimal. Además, cambia el estado de coma a 1, así no se pueden escribir dos comas juntas.
        if(button.innerHTML == "." && display.innerHTML == 0){
            display.innerHTML = ".";
            coma = 1;

        //Si el display está en 0 o resultado está en 1, resetea las variables
        }else if((display.innerHTML == 0 || resultado == 1)){
            display.innerHTML = "";
            resultado = 0;
            coma = 0;
            operando = 0;

        }//Si se presiona la coma, y ésta está en estado cero (0), se escribe una coma y su estado cambia a uno (1) así no se pueden escribir dos comas juntas 
        if(button.innerHTML == "." && coma == 0 ){
            display.innerHTML += button.innerHTML;
            coma = 1;
        }//Si se presiona un número, lo escribe en el display
        if (button.innerHTML !== "." && button.innerHTML !== "+" && button.innerHTML !== "-" && button.innerHTML !== "*" && button.innerHTML !== "/"  ){
            display.innerHTML += button.innerHTML; //Al display le suma el valor (en string) del botón
        }
        

        //Pregunta si toque algún operador y de ser así, llama a ponerOperador, si ésta es True (explicado más arriba), escribe el operador.
        if ((button.innerHTML == "+" || button.innerHTML == "-" || button.innerHTML == "*" || button.innerHTML == "/") && ponerOperador(display)){
            display.innerHTML += button.innerHTML;
            coma = 0;
        }
        if (display.innerHTML == 0){
            display.innerHTML = 0;
        }

    //Si el display tiene más de 13 dígitos, la calculadora se bloquea y manda alert cuando se intenta tocar un botón
    }else{
        alert("Límite de caractéres alcanzado");
    }

}
function borrar(display,button){
    //Pone el display en cero y los estados de coma y operando en cero (0)
    display.innerHTML = 0;
    coma = 0;
    operando = 0;
}
function borrarUltimo(display,button){
    //Si el ultimo número es una coma (.), lo borra y cambia el estado de coma a cero (0)
    if(display.innerHTML.charAt(display.innerHTML.length-1) == "."){
        display.innerHTML = display.innerHTML.slice(0, -1); 
        coma = 0;
    //Si el display esta en cero, o solo tiene un dígito, pone el display en cero
    }else if(display.innerHTML == 0 || display.innerHTML.length == 1){
        display.innerHTML = 0;
    }
    //Sino, saca el último dígito
    else{
    display.innerHTML = display.innerHTML.slice(0, -1);
    }
}
