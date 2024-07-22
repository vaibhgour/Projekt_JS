const startGameBtn = document.querySelector('.start-btn')
const resetGameBtn = document.querySelector('#reset-btn')
let currentTurn = 'X'
let gameOn = false;
const tiles = document.querySelectorAll('.tile')
const playground = document.querySelector('#playground')
let playedTiles = Array(9).fill(null);

startGameBtn.addEventListener('click', startGame)
resetGameBtn.addEventListener('click', resetGame)
startGameBtn.classList.add('cur-pointer');

function endGame(player) {
    gameOn = false
    startGameBtn.innerHTML = `${currentTurn} Won!  Play again?`
    tiles.forEach(tile => {
        tile.removeEventListener('click', tileClick);
        tile.classList.remove('cur-pointer');

    });
    startGameBtn.addEventListener('click', startGame);
    startGameBtn.classList.add('cur-pointer');
}

function resetGame() {
    gameOn = false
    playedTiles = Array(9).fill(null);
    tiles.forEach(tile => {
        tile.classList.remove('cross');
        tile.classList.remove('zero');
        tile.classList.remove('cur-pointer');
    });
    startGameBtn.innerHTML = "Tap to Play!"
    playground.classList.add('closed-playground');
    startGameBtn.addEventListener('click', startGame);
    startGameBtn.classList.add('cur-pointer');
}

function tileClick(event) {
    const tile = event.target;
    const index = Array.from(tiles).indexOf(tile);
    if (gameOn) {
        if (playedTiles[index]) {
            console.log("Oops!! already occupied.");
        }
        else {
            if (currentTurn === 'X') {
                tile.classList.add('cross');
                console.log(index + " clicked");
                playedTiles[index] = 'X';
            }
            if (currentTurn === 'O') {
                tile.classList.add('zero');
                playedTiles[index] = 'O';
            }
            if (checkWin(currentTurn)) {
                console.log("Game end");
                endGame(currentTurn);
            }
        }
    }

}

function startGame() {
    resetGame();
    if (!gameOn) {
        gameOn = true;
        changeTurn();
        playground.classList.remove('closed-playground');
        startGameBtn.removeEventListener('click', startGame);
        startGameBtn.classList.remove('cur-pointer');
        tiles.forEach((tile, index) => {
            tile.classList.add('cur-pointer');
            tile.addEventListener('click', tileClick)
            tile.addEventListener('mouseover', () => {
                if (gameOn) {
                    if (!playedTiles[index]) {
                        tile.classList.add('hover')
                        tile.classList.add(`hover-${currentTurn}`)
                    }
                }
            })
            tile.addEventListener('mouseout', () => {
                tile.classList.remove('hover')
                tile.classList.remove(`hover-${currentTurn}`)
            })
        });
    }

}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        if (playedTiles[winCondition[0]] === player && playedTiles[winCondition[1]] === player && playedTiles[winCondition[2]] === player) {
            console.log("Won");
            return true;
        }
    }
    changeTurn();
}

function changeTurn() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    startGameBtn.innerHTML = `${currentTurn}'s Turn`
}