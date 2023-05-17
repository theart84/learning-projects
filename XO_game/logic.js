let players = ['x', 'o'];
let activePlayer = 0;
let choicePlayer;
let strWinX = '';
let strWinO = '';
let demensionField;
let board = [];
let checkArray = [];
let n;

function startGame() {
    demensionField = prompt(`Выберите размерность поля`);
    if (demensionField === '' || demensionField === null) {
        demensionField = 3;
    }
    n = parseInt(demensionField);
    createcheckArrayay(demensionField)
    choicePlayer = prompt(`Выберите ${players[0]} или ${players[1]}`);
    if (choicePlayer != players[0] && choicePlayer != players[1]) {
        choicePlayer = players[0]
    }
    activePlayer = 0;
    renderBoard(board);
}

function click(row, col) {
    let diagonalLeftRight = '';
    let diagonalRightLeft = '';
    let rowBoard = '';
    let colBoard = '';
    board[row][col] = choicePlayer;
    (choicePlayer === 'x') ? choicePlayer = 'o' : choicePlayer = 'x';
    renderBoard(board);
    checkArray = board.join(',').split(',');
    for (let i = 0, j = n - 1, d = 0, f = 0; i < checkArray.length; i += n + 1, d += n, j += n - 1, f++) {
        diagonalLeftRight += checkArray[i];
        diagonalRightLeft += checkArray[j];
        rowBoard = '';
        colBoard = '';
        for (let k = 0, j = 0; k < n; k++, j += n) {
            rowBoard += checkArray[d + k];
            colBoard += checkArray[f + j];
        }
        if (diagonalLeftRight === strWinX || 
            diagonalLeftRight === strWinO || 
            diagonalRightLeft === strWinX || 
            diagonalRightLeft === strWinO || 
            rowBoard === strWinX || 
            rowBoard === strWinO || 
            colBoard === strWinX || 
            colBoard === strWinO) {
            showWinner(activePlayer);
        } 
    }
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

function createcheckArrayay(count) {
    for (let i = 0; i < count; i++) {
        board.push(['']);
        for (let j = 1; j < count; j++) {
            board[i].push('')
        }
        strWinX += 'x';
        strWinO += 'o';
    }
    return board;
}
