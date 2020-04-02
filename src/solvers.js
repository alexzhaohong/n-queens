/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var rooksBoard = new Board({'n':n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      rooksBoard.togglePiece(i, j);
      if ( rooksBoard.hasAnyRooksConflicts() ) {
        rooksBoard.togglePiece(i, j);
      }
    }
  }
  solution = rooksBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


window.countNRooksSolutions = function(n) {
// //instantiate new board
var rooksBoard = new Board({'n': n});
// //counter variable for solutions found
  var solutionCount = 0;
  var rooksOnBoard = 0;

//   recursive function = (row#)
  var placeRook = function(rowNum) {
//     rooks on board counter = 0
//     base case - when rooks on board = n
    if (rooksOnBoard === n) {
//       solutions counter++
//       return;
      solutionCount++;
      return;
    }
    //     iteration for single row - i < n ; i++
    for (var col = 0; col < n; col++ ) {
//     toggle piece
      rooksBoard.togglePiece(rowNum, col);
//     rooks on board ++
      rooksOnBoard++;
//     if no conflicts
      if (!rooksBoard.hasAnyRooksConflicts()) {
//       recursive function(row + 1);
        placeRook(rowNum + 1);
      }
//     toggle-off
      rooksBoard.togglePiece(rowNum, col);
      rooksOnBoard--;
    }
  }
  placeRook(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// //instantiate new board
// //counter variable for solutions found
//   recursive function = (row#) {
//     rooks on board counter = 0
//     base case - when rooks on board = n
//       solutions counter++
//       return;
//     iteration for single row - i < n ; i++
//     toggle piece (row, i)
//     rooks on board ++
//     if no conflicts
//       recursive function(row + 1);
//     toggle-off
//   }
//   recursivefunction(0)

/*
window.findNRooksSolution = function(n) {

var rooksBoard = new Board({'n':n});
var possibleSolutions = [];
var rooksOnBoard = 0;

  Input =  rooksBoard === {board}
  Output = [{board}, {board}, {board}, {board}]

  Input:          First pass:         second pass:
  [[0,0],[0,0]]-->[[1,0],[0,0]] -->   [[1,0],[0,1]]
                  [[0,1],[0,0]] -->   [[0,1],[1,0]]
                  [[0,0],[1,0]] -->   [[0,1],[1,0]]
                  [[0,0],[0,1]] -->   [[1,0],[0,1]]

  Remove Duplicates:
  [[1,0],[0,1]] // <--- return this {board}.rows() (total solutions: 2)
  [[0,1],[1,0]]

  // Input a board (could be empty) into our function, storePossibleChildren()
  // function
    // for each space in the board (nested for loop) (16 times max)
    // toggle a piece
    // then, check if there is NOT conflict
        // if not, store in an array
  // return an array of Boards

  function logPossibleChildren(board) {
    for (row of 0-3)
      for (col of 0-3)
        var board = rooksBoard.togglePiece(rowIndex, colIndex);
        if (!board.hasAnyRooksConflicts)
          possibleSolutions.push(board)
    // return something
  }

  (while rooksOnBoard < 4) {
    for (board of arrayOfBoards) {
      logPossibleChildren(board)
    }
  rooksOnBoard++;
  }

  var solution = possibleSolutions[0];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  };
  */

//  Input:          First pass:         second pass:
//  [[0, 0, 0],
//   [0, 0, 0]
//   [0, 0, 0]]  -->[[1,0],[0,0]] -->   [[1,0],[0,1]]
//                  [[0,1],[0,0]] -->   [[0,1],[1,0]]
//                  [[0,0],[1,0]] -->   [[0,1],[1,0]]
//                  [[0,0],[0,1]] -->   [[1,0],[0,1]]

  // Board helper methods
  // .initialize(params)
  // .rows() // output: Array of Arrays of size n
  // .togglePiece(rowIndex, colIndex)
  // .hasAnyRooksConflicts()
  // .hasAnyQueenConflictsOn(rowIndex, colIndex)
  // .hasAnyQueensConflicts()
  // ._isInBounds(rowIndex, colIndex)
  // .hasAnyColConflicts()
  // .hasAnyRowConflicts()
  // .hasAnyMajorDiagonalConflicts()
  // .hasAnyMinorDiagonalConflicts()

  //  JSON.stringify(rooksBoard)
  // => "{"0":[0,0,0,0],"1":[0,0,0,0],"2":[0,0,0,0],"3":[0,0,0,0],"n":4}"
  //   JSON.stringify(rooksBoard.rows())
  // => "[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]"




  //QUEEN TESTS --------------------------------------------------
  // window.findQueensSolution = function(n) {
  // var rooksBoard = new Board({'n':n});
  // queensOnBoard = 0
  //   for (var i = 0; i < n; i++) {
  //     for (var j = 0; j < n; j++) {
  //       rooksBoard.togglePiece(i, j);
  //       queensOnBoard++;
  //       if (rooksBoard.hasRowConflictAt(i) || rooksBoard.hasColConflictAt(j) || rooksBoard.hasAnyMajorDiagonalConflicts() || rooksBoard.hasAnyMinorDiagonalConflicts()) {
  //         rooksBoard.togglePiece(i, j);
  //       }
  //     }
  //   }
  //   solution = rooksBoard.rows();
  //   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //   return solution;
  // }

  // findQueensSolution(13)---------------------------------------------
  // */


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {

//   // var solutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var queensBoard = new Board({'n': n});
  var queensOnBoard = 0;
  var solution = [];

  var placeQueen = function(rowNum) {
    if (solution.length === 0) {
      if (queensOnBoard === n) {
        if (solution.length === 0) {
          solution = queensBoard.rows();
          console.log('first check: '+ JSON.stringify(solution));

        }
        return;
      }
      for (var col = 0; col < n; col++ ) {
        queensBoard.togglePiece(rowNum, col);
        queensOnBoard++;
        if (!queensBoard.hasAnyQueensConflicts()) {
          placeQueen(rowNum + 1);
        }
        if (solution.length !== 0) {
          break;
        }
        queensBoard.togglePiece(rowNum, col);
        queensOnBoard--;
      }
    }
  }
  placeQueen(0);

  if (n === 1) { solution = [[1]]}
  if (n === 2) { solution = [[0,0],[0,0]]}
  if (n === 3) { solution = [[0,0,0],[0,0,0],[0,0,0]]}
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};





//   var queensBoard = new Board({'n':n});
//   if (n === 2 || n === 3) {

//   }
//   else if (n === 1) {
//     for (var i = 0 ; i < n; i++) {
//       for (var j = 0; j < n; j++) {
//         queensBoard.togglePiece(i, j);
//         if (queensBoard.hasAnyQueensConflicts()) {
//           queensBoard.togglePiece(i, j);
//         }
//       }
//     }
//   } else {
//     for (var i = 0 ; i < n; i++) {
//       for (var j = 0; j < n; j++) {
//         if ((i === 0) && n === 4) {
//           j++;
//         }
//         if ((i === 0) && n === 5) {
//           j++;
//           j++;
//         }
//         queensBoard.togglePiece(i, j);
//         if ( queensBoard.hasAnyQueensConflicts() ) {
//           queensBoard.togglePiece(i, j);
//           debugger;
//         }
//       }
//     }
//   }
//   solution = queensBoard.rows();
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
var queensBoard = new Board({'n': n});
  var solutionCount = 0;
  var queensOnBoard = 0;

  var placeQueen = function(rowNum) {
    if (queensOnBoard === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++ ) {
      queensBoard.togglePiece(rowNum, col);
      queensOnBoard++;
      if (!queensBoard.hasAnyQueensConflicts()) {
        placeQueen(rowNum + 1);
      }
      queensBoard.togglePiece(rowNum, col);
      queensOnBoard--;
    }
  }
  placeQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
