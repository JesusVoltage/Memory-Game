var user = '';

$(document).ready(function () {
    $(function () {
        AjaxConnect("ranking.php")
    });

    function AjaxConnect(name) {
        $.ajax({
            url: name,
            method: "get",
            dataType: "json",
            success: function (data) {
                var tablita = '';
                console.log(data);
                data.sort(function(a, b){
                    return a.segundos - b.segundos;
                });
                $('#tabla-ranking').append(`
                
                `);
                for (i = 0; i < data.length; i++) {
                    tablita+=`<tr>
                        <td>`+data[i].user+`</td>
                        <td>`+data[i].segundos+`</td>
                        <td>`+data[i].movimientos+`</td>
                    </tr>`;
                }
                $('#tabla-ranking').append(`
                <table class="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Segundos</th>
                    <th>Movimientos</th>
                </tr>
                </thead>
                <tbody>
                `+tablita+`

                    </tbody>
                </table>
                `);
            }
        });
    }

});
let Points = function(){
    $('#ranking').modal('toggle');
}

let iconos = ['js', 'js', 'angular', 'angular', 'java', 'java', 'python', 'python', 'php', 'php', 'html5', 'html5', 'css3-alt', 'css3-alt', 'github', 'github'],

    // ** variables  **  //

    $container = $('.container'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),
    nowTime, // tiempo que llevas
    allOpen = [], // cartas que están volteadas
    match = 0, // número de aciertos
    second = 0, // variable de segundos para el contador
    moves = 0, // número de intentos
    wait = 420, // variable de uso para delays

    parejas = iconos.length / 2; // numero de aciertos que se necesita para ganar (total de cartas / 2) porque hay dos cartas de cada tipo y una pareja por cada tipo de carta

// barajar el deck
function Baraja(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Función que inicia el juego
function Start() {

    let allCards = Baraja(iconos); //llamo a la funcion de barajar
    $deck.empty(); //vacío la variable del deck solucionador y reinicia variables
    match = 0;
    moves = 0;
    $moves.text('0');

    /*       Se crean las cartas en el contenedor ".deck"        */

    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fab fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener(); //activo el listener de las cartas


    resetTimer(nowTime); //Resetea el conómetro
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

//**   Cuando se acierten todas las parejas, merge un MODAL de bootstrap que te indica el final de la partida   **//
function gameOver(moves) {
    $('#uno').val(second);
    $('#dos').val(moves);
    $('#winnerText').text(`En ${second} segundos, Has hecho un total de ${moves} movimientos. Bien hecho!`);
    $('#winnerModal').modal('toggle');
}

// Esta funcion "desbloquea las cartas" cuando se pulsa el boton "restart" 
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        Start();
    }
});

// Esta funcion, permite desbloquear mas cartas, cuando una o mas parejas esten resueltas sin que se volteen
let addCardListener = function () {

    $deck.find('.card').bind('click', funcioncita);
}

function initTime() { // inicia el crono
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

function resetTimer(timer) { // Resetea el crono

    if (timer) {
        clearInterval(timer);
    }
}

Start();

function habilitar() {
    $('li').on('click', funcioncita);
}
function funcioncita() {

    let $this = $(this);

    if ($this.hasClass('show') || $this.hasClass('match')) {
        return true;
    }

    let card = $this.context.innerHTML;
    $this.addClass('open show');
    allOpen.push(card);

    // comparamos las cartas 
    if (allOpen.length > 1) {
        if (card === allOpen[0]) { //si aciertas
            $deck.find('.open').addClass('match');
            var uno = setTimeout(function () {
                $deck.find('open').removeClass('open show');
            }, wait);
            match++;

            // Si fallas
        } else {
            $('li').off('click');
            $('.card').click(false);
            $deck.find('.open').addClass('notmatch');
            var dos = setTimeout(function () {
                $deck.find('.open').removeClass('open show');
                habilitar();
            }, wait / 0.5); //esto es el delay para que vuelvan a "no giradas"

        }
        allOpen = []; // reinicia las cartas en juego
        moves++; // suma un movimiento

        $moves.html(moves); // actualiza los movimientos que llevas en la partida
    }

    // compara el numero de parejas que tienes con el total, para ver si has ganado
    if (parejas === match) {
        setTimeout(function () {
            gameOver(moves);
        }, 500);
    }
}
