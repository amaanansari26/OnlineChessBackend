/* eslint-disable no-case-declarations */
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

  getAvailableMoves(position, isRecursion = false) {
    const row = Number(position.split('-')[0]);
    const pos = Number(position.split('-')[1]) - 1;
    const selectedPiece = this.board[row][pos];
    if (selectedPiece === 0) return false;
    const raceOfPiece = selectedPiece.split('-')[0];
    const opRaceOfPiece = raceOfPiece === 'w' ? 'b' : 'w';
    const classOfPiece = selectedPiece.split('-')[1];
    let availableMoves = [];
    let availableKillMoves = [];
    let pointer = this.board[row][pos];
    let prow = row;
    let ppos = pos;
    const combineMoves = (pclass) => {
      const directionsByClass = {
        rook: [[1, 0], [-1, 0], [0, 1], [0, -1]],
        bishop: [[1, 1], [-1, -1], [1, -1], [-1, 1]],
        queen: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]],
      };
      directionsByClass[pclass].forEach((direction) => {
        pointer = this.board[row][pos];
        prow = row;
        ppos = pos;

        while (pointer !== undefined) {
          prow += direction[0];
          ppos += direction[1];
          if (prow > 8 || prow < 1 || ppos > 7 || ppos < 0) {
            pointer = undefined;
          } else {
            pointer = this.board[prow][ppos];
          }
          if (pointer === 0) availableMoves.push(`${prow}-${ppos + 1}`);
          if ((pointer !== 0 && pointer !== undefined) && pointer.split('-')[0] === opRaceOfPiece) {
            availableMoves.push(`${prow}-${ppos + 1}`);
            availableKillMoves.push(`${prow}-${ppos + 1}`);
            pointer = undefined;
          }
          if ((pointer !== 0 && pointer !== undefined) && pointer.split('-')[0] === raceOfPiece) pointer = undefined;
        }
      });
    };
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

      case 'rook':
        combineMoves('rook');
        break;
      case 'bishop':
        combineMoves('bishop');
        break;
      case 'queen':
        combineMoves('queen');
        break;
      case 'knight':
        [
          [row + 2, pos - 1],
          [row + 2, pos + 1],
          [row - 2, pos - 1],
          [row - 2, pos + 1],
          [row + 1, pos - 2],
          [row - 1, pos - 2],
          [row + 1, pos + 2],
          [row - 1, pos + 2],
        ].forEach(([krow, kpos]) => {
          if (krow < 9 && krow > 0 && kpos < 8 && kpos >= 0 && this.board[krow][kpos] === 0) availableMoves.push(`${krow}-${kpos + 1}`);
          if (krow < 9 && krow > 0 && kpos < 8 && kpos >= 0 && this.board[krow][kpos] !== 0 && this.board[krow][kpos].split('-')[0] === opRaceOfPiece) {
            availableMoves.push(`${krow}-${kpos + 1}`);
            availableKillMoves.push(`${krow}-${kpos + 1}`);
          }
        });

        break;
      case 'king':
        [
          [row + 1, pos],
          [row + 1, pos + 1],
          [row + 1, pos - 1],
          [row, pos + 1],
          [row, pos - 1],
          [row - 1, pos - 1],
          [row - 1, pos],
          [row - 1, pos + 1],
        ].forEach(([krow, kpos]) => {
          if (krow < 9 && krow > 0 && kpos < 8 && kpos >= 0 && this.board[krow][kpos] === 0) availableMoves.push(`${krow}-${kpos + 1}`);
          if (krow < 9 && krow > 0 && kpos < 8 && kpos >= 0 && this.board[krow][kpos] !== 0 && this.board[krow][kpos].split('-')[0] === opRaceOfPiece) {
            availableMoves.push(`${krow}-${kpos + 1}`);
            availableKillMoves.push(`${krow}-${kpos + 1}`);
          }
        });
        if (!isRecursion) {
          const opRaceLocations = [];
          for (let r = 1; r < 9; r += 1) {
            for (let p = 0; p < 8; p += 1) {
              if (this.board[r][p] !== 0 && this.board[r][p].split('-')[0] === opRaceOfPiece) opRaceLocations.push(`${r}-${p + 1}`);
            }
          }
          let opAvailableMoves = [];
          opRaceLocations.forEach((loc) => {
            // eslint-disable-next-line max-len
            opAvailableMoves = opAvailableMoves.concat(this.getAvailableMoves(loc, true).availableMoves);
          });
          availableMoves = availableMoves.filter((mov) => !opAvailableMoves.includes(mov));
          availableKillMoves = availableKillMoves.filter((mov) => !opAvailableMoves.includes(mov));
        }

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
console.log(myGame.getAvailableMoves('5-4'));
console.log('done');
