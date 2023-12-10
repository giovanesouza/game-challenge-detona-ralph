// Gerenciamento de estados globais
const state = {
    // Elementos (view)
    view: {
        squares: document.querySelectorAll(".square"), // Quadrados
        enemy: document.querySelector(".enemy"), // Onde vai aparecer o inimigo
        timeLeft: document.querySelector("#time-left"), // Tempo
        score: document.querySelector("#score"), // Pontuação
    },
    // Variáveis do jogo - guardam valores
    values: {
        gameVelocity: 1000, // Velocidade que o inimigo aparece
        hitPosition: 0, // Posição do inimigo
        result: 0, // Pontuação
        curretTime: 60, // Tempo do jogo
    },
    // Executa as funções a cada 1000ms
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};


// Conta o tempo (decrementa)
function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    // Jogo finalizado
    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
};


//   Executa áudio - permite tocar um áudio de forma dinâmica
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
};



// Sorteia quadrado aleatoriamente
function randomSquare() {
    // Remove a classe enemy de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Seta a classe enemy no quadrado sorteado
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};


// Verifica se o quadrado clicado corresponde ao sorteado
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;

                // Cada vez que acertar o inimigo toca o áudio
                playSound("hit");
            }
        });
    });
};



//  Dá o start no jogo
function initialize() {
    addListenerHitBox();
};

initialize();