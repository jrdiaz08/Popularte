
if ('serviceWorker' in navigator) { //se activa la funcion de service worker, esta solo puede funcionar en el protocolo HTTPS
    navigator.serviceWorker.register('./swPopularte.js')
      .then(reg => console.log('Registro de Service Worker exitoso', reg))
      .catch(err => console.warn('Error al registrar el Service Worker', err))
  }
var gatillo = 0; // define la variable con un valor inicial para funciones de una unica reproduccion o de varios estados
var gatillo1 = 0; // define la variable con un valor inicial para funciones de una unica reproduccion o de varios estados
var gatillo2 = 0; // define la variable con un valor inicial para funciones de una unica reproduccion o de varios estados

setTimeout(function () { // se ejecuta la funcion una vez se carga la pagina, con un retraso definido
    document.getElementById('loader').style.transform="scale(0)"; // en la seccion loader se altera la propiedad css escala   
},2000); // el retraso definido en milisegundos

function fecha() { // funcion que extrae la fecha del navegador, codigo descargado
    var hoy = new Date();
    var m = new Array();
    var d = new Array();
    var an= hoy.getFullYear();
    m[0]="Enero";  m[1]="Febrero";  m[2]="Marzo";
    m[3]="Abril";   m[4]="Mayo";  m[5]="Junio";
    m[6]="Julio";    m[7]="Agosto";   m[8]="Septiembre";
    m[9]="Octubre";   m[10]="Noviembre"; m[11]="Diciembre";
    document.write(hoy.getDate());
    document.write(" de ");
    document.write(m[hoy.getMonth()]);
    document.write(" ");
    document.write(hoy.getFullYear());   
}

function tabla(){ //inicia la funcion con el boton resumen del html
    if (gatillo == 0){ //conducional para reporducir la funcion una sola vez
        document.getElementById("esconder").style.display="none"; // en la seccion esconder se altera la propiedad css escala 
        document.getElementById("resumen").style.background="white"; //cambia el color de fondo de la tabla nueva
        var resumen = document.getElementById("resumen"); // se referencia la seccion donde estara la nueva tabla
        var cabecera = document.createElement("tr"); // se crea un nuevo renglon
        cabecera.innerHTML = document.getElementById("encabezado").innerHTML; // se introduce el contenido del encabezado en el nuevo renglon
        console.log(cabecera); // se muestra el contenido del nuevo renglon por consola
        resumen.appendChild(cabecera); // el nuevo renglon se anexa a la nueva tabla
        
        var filas = document.querySelectorAll("input[type=checkbox]"); // se crea un array con todos los checkbox del html
        var nFilas = filas.length; // se crea una variable con el numero de la longitud del array con todos los checkbox
        console.log(nFilas); // se muestra el numero de los checkbox por consola
        var filasOk = document.querySelectorAll("input[type=checkbox]:checked"); // se crea un array con todos los checkbox seleccionados
        var NfilasOk = filasOk.length; // se crea una variable con el numero de la longitud del array con todos los checkbox seleccionados
        console.log(NfilasOk); // se muestra el numero de los checkbox seleccionados por consola

        for (var i = 0; i < NfilasOk; i++){ // se crea un ciclo ue recorra todos los checkbox seleccionados
            var celda = filasOk[i].parentElement; // se referencia la celda que contiene al checkbox seleccionado
            var fila = celda.parentElement; // se referencia fila contiene la celda del checkbox seleccionado
            var resumen = document.getElementById("resumen"); // se referencia la tabla nueva
            var filaNueva = document.createElement("tr"); // se crea un nuevo renglon
            filaNueva.innerHTML = fila.innerHTML; // se introduce el contenido de la fila del checkbox seleccionado en el nuevo renglon
            resumen.appendChild(filaNueva); // el nuevo renglon se anexa a la nueva tabla
        }
        gatillo = 1; // se cambia el valor del gatillo para que no se vuelva a reproducir la funcion
    }
}

function barra(){ // inicia la funcion con el mover de la barra de rango
    var barra = document.getElementById("tamaño"); // se referencia la barra de rango
    var altura = document.getElementById("alto"); // se referencia el input del alto
    var anchura = document.getElementById("ancho"); // se referencia el input del ancho 
    anchura.value = barra.value; // el valor que tenga la barra sera el valor que se muestra en el ancho

    if (document.getElementById('escala_1').checked){ // condicional que se cumple si el radio 1 esta seleccionado
        altura.value = anchura.value; // se iguala el valor del ancho con el alto
    }
    if (document.getElementById('escala_2').checked){ // condicional que se cumple si el radio 2 esta seleccionado
        alto = anchura.value*1.3333333; // el alto sera el valor del ancho multiplicado por 1.333 para que tenga la escala 4:3
        altura.value = Math.round(alto * 100) / 100; // se redondea el valor del alto y se limita a dos decimas
    
    }
    if (document.getElementById('escala_3').checked){ // condicional que se cumple si el radio 3 esta seleccionado
        alto = anchura.value*1.7777777; // el alto sera el valor del ancho multiplicado por 1.777 para que tenga la escala 16:9
        altura.value = Math.round(alto * 100) / 100; // se redondea el valor del alto y se limita a dos decimas
    }
    // console.log(altura.value); // se muestra el valor del alto en consola
    // console.log(anchura.value); // se muestra el valor del ancho en consola
    var tiempoArea = document.getElementById("tiempo/area"); // se referencia la opcion tiempo/area
    tiempoArea = parseFloat(tiempoArea.value); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN
        
    var altura = document.getElementById("alto"); // se referencia el input del alto
    altura = altura.value; // la variable toma el valor que tenga el cuadro en ese momento
    var anchura = document.getElementById("ancho"); // se referencia el input del ancho
    anchura = anchura.value; // la variable toma el valor que tenga el cuadro en ese momento

    var areaTotal = altura*anchura; // se obtiene el area multiplicando las dimensiones
    var tiempoTotal = tiempoArea*areaTotal; // se optiene el tiempo de grabado en minutos multiplicando el area por la relacion tiempo/area

    if (tiempoTotal<60){ // condicional que se cumple si el tiempo en menor de 1 HORA
        var tiempoHoras = tiempoTotal/60; // tiempo total transformado en horas
        var horas = 0; //se iguala las horas a 0 por ser el tiempo menor a 1 hora
        var minutos = Math.round(tiempoTotal); // se redondea el tiempo total para obtener los minutos de grabado
    }else{ // condicional que se cumple si el tiempo es mayor de 1 HORA
        var tiempoHoras = tiempoTotal/60; // tiempo total transdormado en horas
        var horas = Math.trunc(tiempoHoras); // se obtiene la parte entera del tiempo total en horas para determinar las horas de grabado
        var minutos = Math.round((tiempoHoras-horas)*60); // se resta el tiempo en horas menos las horas, esa resta es la parte decimal del tiempo en horas para luego multiplicar por 60 para obtener los minutos totales, el valor es redondeado 

    }
    document.getElementById("horas").value=horas; // se incluye el dato de las horas en el atributo value para mostrarse en la app
    document.getElementById("minutos").value=minutos; // se incluye el dato de los minutos en el atributo value para mostrarse en la app
}

function generar(){ // inicia la funcion al presionar el boton generar
    var gastoCnc = document.getElementById("gastoCnc"); // se referencia la opcion gastocnc
    gastoCnc = gastoCnc.value // la variable toma el valor que tenga en el atributo value
    gastoCnc = parseFloat(gastoCnc); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN

    var valorMinuto = document.getElementById("valorMinuto"); // se referencia la opcion valorminuto
    valorMinuto = valorMinuto.value // la variable toma el valor que tenga en el atributo value
    valorMinuto = parseFloat(valorMinuto); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN

    var valorArea = document.getElementById("valorArea"); // se referencia la opcion valorarea
    valorArea = valorArea.value // la variable toma el valor que tenga en el atributo value
    valorArea = parseFloat(valorArea);// se transforma el dato de TEXTO A NUMERO, para EVITAR NUN
    
    var seleccion = document.getElementById("producto"); // se referencia la opcion producto
    seleccion = parseFloat(seleccion.value); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN
    
    var cantidad = document.getElementById("cantidad"); // se referencia el input cantidad
    cantidad = cantidad.value; // la variable toma el valor que tenga en el atributo value

    var alto = document.getElementById("alto").value; // se referencia el input del alto y la variable toma el valor de value
    var ancho = document.getElementById("ancho").value; // se referencia el input del ancho y la variable toma el valor de value
    var area = alto*ancho; // se obtiene el area multiplicando las dimensiones

    var horas = document.getElementById("horas").value; // se referencia el input de las horas y la variable toma el valor de value
    horas = parseFloat(horas); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN
    var minutos = document.getElementById("minutos").value; // se referencia el input de las horas y la variable toma el valor de value
    minutos = parseFloat(minutos); // se transforma el dato de TEXTO A NUMERO, para EVITAR NUN
    var tiempo = (horas*60)+minutos; // se obtiene el tiempo total en minutos
    
    var gastoUsoCnc = tiempo*gastoCnc*cantidad; // se obtiene el gasto en el uso del cnc
    var costosGastosProducto = area*seleccion*cantidad; // se obtiene el costo y gasto dependiendo del producto
    var totalCostosGastos = gastoUsoCnc+costosGastosProducto; // se obtiene el total de costos y gastos

    var precio80 = totalCostosGastos/0.2; // se obtiene el precio para tener un 80% de utilidad
    var precioMinuto = tiempo*valorMinuto*cantidad; // se obtiene el precio segun el tiempo de grabado
    var precioArea = area*valorArea*cantidad; // se obtiene el precio segun el area de grabado
    var precioVenta = (precioMinuto*0.3)+(precioArea*0.3)+(precio80*0.4) // se obtiene el precio final segun las propociones de los otros precios
    if (isNaN(precioVenta)){ // condicional que se cumple si no se ingresaron todos los datos necesarios
        document.getElementById("valor").value="$"+0 // el precio de venta toma un valor de cero
    }else{ // condicional que se cumple si se ingresaron todos los datos necesarios
        document.getElementById("valor").value="$"+Math.round(precioVenta) // se muestra el precio de venta redondeado
    }
    // console.log(nombreDeVariable); //para visualizar el contenido de dicha variable en consola
}

function datos(){ // inicia la funcion al presionar la flecha
    if (gatillo==0){ // condicional que se cumple si gatillo es igual a cero
        var tablaDatos = document.getElementById("tablaDatos"); // se referencia la tabla nueva
        var filaNueva = document.createElement("div"); // se crea un nuevo renglon
        filaNueva.innerHTML = "Tabla De Datos"; // se incluye el texto dentro de la etiqueta
        tablaDatos.appendChild(filaNueva); // el nuevo renglon se anexa a la nueva tabla

        var renglones = document.querySelectorAll("option"); // se crea un array con todos las etiquetas option de los productos
        var nRenglones = renglones.length // se determina la cantidad de etiquetas option
        for (var i = 0; i < nRenglones; i++){ // se crea un ciclo que recorra todos las option
            var tablaDatos = document.getElementById("tablaDatos"); // se referencia la tabla nueva
            var filaNueva = document.createElement("div"); // se crea un nuevo renglon
            filaNueva.innerHTML = renglones[i].id + "=>" + renglones[i].value; // se incluye el texto dentro de la etiqueta
            tablaDatos.appendChild(filaNueva); // el nuevo renglon se anexa a la nueva tabla
        } 
        gatillo = 1; // se cambia el valor del gatillo para alternar la funcion  
    }else{
        var tablaDatos = document.getElementById("tablaDatos"); // se referencia la tabla nueva
        tablaDatos.parentNode.removeChild(tablaDatos); // se remueve todo el contenido de la tabla, incluyendo la etiqueta de la tabla
        var fila = document.getElementById("fila"); // se referencia la seccion fila
        var tablaDatos = document.createElement("table"); // se crea nuevamente la tabla, esta vez vacia
        tablaDatos.id = "tablaDatos"; // se determina el atributo id para la nueva tabla, para que pueda volver a llenarse
        fila.appendChild(tablaDatos); // se anexa la tabla nuevamente donde estaba
        gatillo = 0; // se cambia el valor del gatillo para alternar la funcion
    }
}
function insertar1() { // funcion que inserta imagen del respectivo boton
    var imagenInicial = document.getElementById("imgListadoDeProducto");
    imagenInicial.removeChild;
    var idPadre = event.srcElement.id;
    var urlimg = idPadre+".png";
    console.log(idPadre);
    console.log(urlimg);
   
    if (gatillo1==0){ // condicional que se cumple si gatillo es igual a cero
        imagenInicial.innerHTML ="<img class="+"imgProcesos"+" src="+urlimg+">"
        gatillo1 = 1; // se cambia el valor del gatillo para alternar la funcion  
    }else{
        imagenInicial.innerHTML =""
        gatillo1 = 0; // se cambia el valor del gatillo para alternar la funcion
    }       
}
function insertar2() { // funcion que inserta imagen del respectivo boton
    var imagenInicial = document.getElementById("imgPersonalVentas");
    imagenInicial.removeChild;
    var idPadre = event.srcElement.id;
    var urlimg = idPadre+".png";
    console.log(idPadre);
    console.log(urlimg);
   
    if (gatillo2==0){ // condicional que se cumple si gatillo es igual a cero
        imagenInicial.innerHTML ="<img class="+"imgProcesos"+" src="+urlimg+">"
        gatillo2 = 1; // se cambia el valor del gatillo para alternar la funcion  
    }else{
        imagenInicial.innerHTML =""
        gatillo2 = 0; // se cambia el valor del gatillo para alternar la funcion
    }       
}

