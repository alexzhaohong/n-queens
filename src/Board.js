// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex]; // What is the plus sign? -ah
      this.trigger('change'); //[ [0,0,0], [0,0,0] ] ele[colIndex] --> 0 or 1 +=
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      console.log(this.rows());
      var targetRow = this.get(rowIndex);
      var conflicts = 0;
      var boardSize = this.get('n'); //4

      for (var i = 0; i < boardSize ; i++) {
        if (targetRow[i] === 1) {
          conflicts++;
        }
      }
      if(conflicts > 1) {
        return true;
      } else {
        return false;
      }
      // ES6
      // for (let ele of targetRow) {
      //   if (ele === 1) {
      //     conflicts++;
      //   }
      // }
      // return (conflicts > 1) ? true : false
    },


    // test if any rows on this board contain conflicts
    // iterate through the total # of rows (n)
    // for each (row in Board), if any hasRowConflictAt(row) returns false, return false
    hasAnyRowConflicts: function() {

      var boardSize = this.get('n'); //4
      var hasConflict = false;

      for (var i = 0; i < boardSize ; i++) {
        if (this.hasRowConflictAt(i)) {
          hasConflict = true;
          break;
        }
      }
    return hasConflict;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var colIndex = colIndex
      var conflicts = 0;
      var boardSize = this.get('n'); //4
      for (var i = 0; i < boardSize ; i++) {
        // for each row in board, at the column index, check if 1
        if (this.get(i)[colIndex] === 1) {
          conflicts++;
        }
      }
      if(conflicts > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardSize = this.get('n'); //4
      var hasConflict = false;

      for (var i = 0; i < boardSize ; i++) {
        if (this.hasColConflictAt(i)) {
          hasConflict = true;
          break;
        }
      }
    return hasConflict;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      // inputs go from -n+1 to 0 to n-1
      // Iterate from -n+1 to n-1
        // First is -n+1 (-3) row:0 column: -3
        // row 1, col -2
        // each iteration, [r.c] [+1, +1]
        // if row or col is negative or greater than n-1, skip
        // else, check if 1, add to var conflicts
      // if conflicts is greater than 1, return true

      var colIndex = majorDiagonalColumnIndexAtFirstRow // -3 to 3 example input = -10
      var boardSize = this.get('n'); //4
      var conflicts = 0;

      for (var i = 0; i < boardSize; i++) {
        // for each row in board, at the column index, check if 1

        if (colIndex >= 0 || colIndex < boardSize) {
          if (this.get(i)[colIndex] === 1) {
            conflicts++;
          }
        }
        colIndex++;
      }

      if(conflicts > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.get('n'); //4
      var hasConflict = false;

      // inputting colIndex. -3 to 3,
      for (var i = (-boardSize) + 1; i < boardSize ; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          hasConflict = true;
          break;
        }
      }
    return hasConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      // inputs could be from 0 to n to 2n-1
      var colIndex = minorDiagonalColumnIndexAtFirstRow // 0 to 7
      var boardSize = this.get('n'); //4
      var conflicts = 0;

      for (var i = 0; i < boardSize; i++) {
        if (colIndex >= 0 || colIndex < boardSize) {
          if (this.get(i)[colIndex] === 1) {
            conflicts++;
          }
        }
        colIndex--;
      }

      if(conflicts > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardSize = this.get('n'); //4
      var hasConflict = false;

      // inputting colIndex. 0 to 7
      for (var i = 0; i < (2 * boardSize) - 1 ; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          hasConflict = true;
          break;
        }
      }
    return hasConflict;
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  }; // Make an array of size n, pre-fill with 0. Then, make an array of size n, pre-fill with those [...0] arrays
}());






