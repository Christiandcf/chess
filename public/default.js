
// Creates the chess game
var board;
var game;

// Socket io client
var socket = io();

window.onclick = function(e) {
    socket.emit('message', 'hello boy!');
};

window.onload = function () {
    initGame();
};

// Initialize game
var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };

   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

// called when a player makes a move on the board UI
var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});

    if (move === null)  return 'snapback';
    else socket.emit('move', move);

};

// called when the server calls socket.broadcast('move')
// Listen to socket move event on the server
socket.on('move', function (msg) {
    game.move(msg); // moves the piece
    board.position(game.fen()); // fen is the board layout
});
