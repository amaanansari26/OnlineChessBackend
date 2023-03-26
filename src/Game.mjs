class Game {
  board = {
    8: ['b-rook-1', 'b-knight-1', 'b-bishop-1', 'b-queen', 'b-king', 'b-bishop-2', 'b-knight-2', 'b-rook-2'],
    7: ['b-pawn-1', 'b-pawn-2', 'b-pawn-3', 'b-pawn-4', 'b-pawn-5', 'b-pawn-6', 'b-pawn-7', 'b-pawn-8'],
    6: [0, 0, 0, 0, 0, 0, 0, 0],
    5: [0, 0, 0, 0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 0, 0],
    2: ['w-pawn-1', 'w-pawn-2', 'w-pawn-3', 'w-pawn-4', 'w-pawn-5', 'w-pawn-6', 'w-pawn-7', 'w-pawn-8'],
    1: ['w-rook-1', 'w-knight-1', 'w-bishop-1', 'w-queen', 'w-king', 'w-bishop-2', 'w-knight-2', 'w-rook-2'],

  };

  moves = [];

  players = {
    white: {
      name: '',
    },
    black: {
      name: '',
    },
  };

  chance = 'white';

  startTime = Date.now();

  availablePieces = [
    'w-rook-1',
    'w-rook-2',
    'w-knight-1',
    'w-knight-2',
    'w-bishop-1',
    'w-bishop-2',
    'w-queen',
    'w-king',
    'w-pawn-1',
    'w-pawn-2',
    'w-pawn-3',
    'w-pawn-4',
    'w-pawn-5',
    'w-pawn-6',
    'w-pawn-7',
    'w-pawn-8',
    'b-rook-1',
    'b-rook-2',
    'b-knight-1',
    'b-knight-2',
    'b-bishop-1',
    'b-bishop-2',
    'b-queen',
    'b-king',
    'b-pawn-1',
    'b-pawn-2',
    'b-pawn-3',
    'b-pawn-4',
    'b-pawn-5',
    'b-pawn-6',
    'b-pawn-7',
    'b-pawn-8',
  ];

  killedPieces = [];

  getAvailableMoves(position) {
    const row = Number(position.split('-')[0]);

    const pos = Number(position.split('-')[1]) - 1;
    const selectedPiece = this.board[row][pos];
    const raceOfPiece = selectedPiece.split('-')[0];
    const classOfPiece = selectedPiece.split('-')[1];
    const availableMoves = [];
    const availableKillMoves = [];
    switch (classOfPiece) {
      case 'pawn':
        if (raceOfPiece === 'w' && this.board[row + 1][pos] === 0) availableMoves.push(`${row + 1}-${pos + 1}`);
        if (raceOfPiece === 'b' && this.board[row - 1][pos] === 0) availableMoves.push(`${row - 1}-${pos + 1}`);
        if (raceOfPiece === 'w' && this.board[row + 1][pos - 1] && this.board[row + 1][pos - 1].split('-')[0] === 'b') {
          availableMoves.push(`${row + 1}-${pos}`);
          availableKillMoves.push(`${row + 1}-${pos}`);
        }
        if (raceOfPiece === 'w' && this.board[row + 1][pos + 1] && this.board[row + 1][pos + 1].split('-')[0] === 'b') {
          availableMoves.push(`${row + 1}-${pos + 2}`);
          availableKillMoves.push(`${row + 1}-${pos + 2}`);
        }
        if (raceOfPiece === 'b' && this.board[row - 1][pos - 1] && this.board[row - 1][pos - 1].split('-')[0] === 'w') {
          availableMoves.push(`${row - 1}-${pos}`);
          availableKillMoves.push(`${row - 1}-${pos}`);
        }
        if (raceOfPiece === 'b' && this.board[row - 1][pos + 1] && this.board[row - 1][pos + 1].split('-')[0] === 'w') {
          availableMoves.push(`${row - 1}-${pos + 2}`);
          availableKillMoves.push(`${row - 1}-${pos + 2}`);
        }
        break;

      case 'rook': console.log(1);
        break;

      default:
        return false;
    }
    return { availableMoves, availableKillMoves };
  }

  constructor({ playerOneName, playerTwoName }) {
    this.players.white.name = playerOneName;
    this.players.black.name = playerTwoName;
  }
}

export default Game;

const myGame = new Game({ playerOneName: 'Amaan', playerTwoName: 'Hadiya' });
console.log(myGame.getAvailableMoves('3-2'));
