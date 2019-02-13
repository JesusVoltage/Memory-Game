// lista con todos los inconos que quiero que haya en el juego

let icono = ['js', 'js', 'angular', 'angular', 'java', 'java', 'python', 'python', 'php', 'php', 'html5', 'html5', 'css3-alt', 'css3-alt', 'github', 'github'],

    //algunas
    $container = $('.container'),
    $scorePanel = $('.info'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),

    // Set variables to shorten code
    nowTime,
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    wait = 420,
    totalCard = icono.length / 2,

    // Scoring system from 1 to 3 stars to shorten code
    stars3 = 14,
    stars2 = 16,
    star1 = 20;

// Shuffling function: enables that no two games have the same card arrangement 
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// The function init() enables the game to begin
function init() {

    // The shuffle function shuffles the icono array
    let allCards = shuffle(icono);
    $deck.empty();

    // The game starts with no matching cards and zero moves 
    match = 0;
    moves = 0;
    $moves.text('0');

    // A for loop creates 16  <li> tags with the class of card for every <i> tag
    // A class of fa fa- and a name of each object from the icono=[] array
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fab fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    // Enables the timer to reset to 0 when the game is restarted
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

// Adds a score from 1 to 3 stars depending on the amount of moves done


// Add boostrap modal alert window showing time, moves, score it took to finish the game, toggles when all pairs are matched.
function gameOver(moves) {
    $('#winnerText').text(`En ${second} segundos, Has hecho un total de ${moves} movimientos. Bien hecho!`);
    $('#winnerModal').modal('toggle');
}

// Clicking on the button located on the top right of the game, enables the cards too be reset
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        init();
    }
});

// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        // Compares cards if they matched
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                // If cards are not matched, there is a delay of 630ms, and the cards will turn back cover up.
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            // The allOpen array specifies all added cards facing up
            allOpen = [];

            // Increments the number of moves by one only when two cards are matched or not matched
            moves++;

            // The number of moves is added to the rating() function that will determine the star score
            

            // The number of moves are added to the modal HTML alert
            $moves.html(moves);
        }

        // The game is finished once all cards have been matched, with a short delay
        if (totalCard === match) {
            setTimeout(function () {
                gameOver(moves);
            }, 500);
        }
    });
}

// Initiates the timer as soon as the game is loaded
function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

init();