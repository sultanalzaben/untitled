const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute('data-cell-index'));

    if (gameBoard[cellIndex] !== '' || !isGameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        isGameActive = false;
        return;
    } else if (gameBoard.every(cell => cell !== '')) {
        setTimeout(() => alert("It's a draw!"), 100);
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombinations.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '';
    });
}

function resetGame() {
    isGameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach((cell, index) => {
    cell.setAttribute('data-cell-index', index);
    cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', resetGame);
