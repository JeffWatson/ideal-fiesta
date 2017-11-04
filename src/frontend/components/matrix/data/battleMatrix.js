import { isEqual, some } from 'lodash';
import {
  UNITS,
  TERRAIN,
  MOVE_PATH_VALUES,
} from 'shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  getUnitAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'unit', 'actor']);
  }

  getHealthAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'health']);
  }

  getTerrainAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'terrain']);
  }

  onCellSelected({ row, column }) {
    this.matrix = this.deselectAllCells();
    this.selectCell({ row, column });
    return this.matrix;
  }

  selectCell({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'selected'], true));
  }

  deselectAllCells() {
    return this.matrix.set('grid', this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn =>
      matrixColumn.merge({
        selected: false,
        attackable: false,
        movable: false,
        visited: false,
        actionable: false,
        moveDirection: false,
        movementTail: false,
        attacking: false,
        combinable: false,
      }))));
  }

  rangeCheck({ row, column }) {
    const unit = this.getUnitAt({ row, column });
    const unitProps = UNITS[unit];
    const stats = unitProps.stats;

    this.calculateMoves({
      row,
      column,
      move: stats.move,
      range: stats.range,
      unitProps,
      currentPlayer: this.matrix.get('currentPlayer'),
    });

    return this.matrix;
  }

  getMoveDistance() {
    return this.matrix.get('grid').reduce((memo, matrixRow) => memo + matrixRow.count(matrixColumn => matrixColumn.get('moveDirection')), 0);
  }

  getSelectedCell() {
    let selected;
    this.matrix.get('grid').find((matrixRow, row) => matrixRow.find((matrixColumn, column) => {
      if (matrixColumn.get('selected')) {
        selected = matrixColumn.merge({ row, column });
        return true;
      }
      return false;
    }));

    return selected;
  }

  calculateMoves(firstMove) {
    const queue = [];
    this.calculateNextMoves(firstMove, queue);

    let queueIndex = 0;
    while (queue.length > queueIndex) {
      const { row, column, move, range, unitProps, currentPlayer } = queue[queueIndex];
      this.calculateMove({ row, column, move, range, unitProps, currentPlayer });

      const cell = this.getCell({ row, column });
      if (cell.get('movable') && move >= 0) {
        this.calculateNextMoves({ row,
          column,
          move: move - 1,
          range,
          unitProps,
          currentPlayer }, queue);
      } else if (cell.get('attackable') && move > 0 && range > 1) {
        this.calculateNextMoves({ row,
          column,
          move: 0,
          range: range - 1,
          unitProps,
          currentPlayer }, queue);
      } else if (cell.get('attackable') && !move && range > 1) {
        this.calculateNextMoves({ row,
          column,
          move,
          range: range - 1,
          unitProps,
          currentPlayer }, queue);
      }

      queueIndex += 1;
    }
  }

  calculateNextMoves(operation, queue) {
    const { row, column, move, range, unitProps, currentPlayer } = operation;
    const isInQueue = (q, findMe) => some(q, object => isEqual(object, findMe));

    const north = { row: row - 1, column, move, range, unitProps, currentPlayer };
    const south = { row: row + 1, column, move, range, unitProps, currentPlayer };
    const west = { row, column: column - 1, move, range, unitProps, currentPlayer };
    const east = { row, column: column + 1, move, range, unitProps, currentPlayer };
    if (north.row >= 0 && !isInQueue(queue, north)) {
      queue.push(north);
    }
    if (west.column >= 0 && !isInQueue(queue, west)) {
      queue.push(west);
    }
    if (south.row < this.matrix.get('rows') && !isInQueue(queue, south)) {
      queue.push(south);
    }
    if (east.column < this.matrix.get('columns') && !isInQueue(queue, east)) {
      queue.push(east);
    }
  }

  // TODO units going in PERSONNEL_CARRIER?
  // TODO terrain modifiers, mountains should be harder to climb, sand too, etc...
  calculateMove({ row, column, move, range, unitProps, currentPlayer }) {
    const cell = this.getCell({ row, column });
    const occupantUnit = cell.getIn(['unit', 'actor']);
    const isCurrentPlayer = cell.get('player') === currentPlayer;
    const selectedCell = this.getSelectedCell();

    const attackable = range > 0 && occupantUnit ?
      unitProps.attacks.includes(UNITS[occupantUnit].type) : true;

    if (attackable && !isCurrentPlayer) {
      this.matrix = this.matrix.set('grid', this.matrix.get('grid').mergeIn([row, column, 'attackable'], attackable));
    }

    const terrain = cell.get('terrain');
    const occupied = cell.get('unit');
    const selected = cell.get('selected');
    const terrainInaccessible = unitProps.inaccessibleTerrain.includes(terrain);
    const movable = (!occupied || selected) && move > 0 && !terrainInaccessible;
    const terrainProps = TERRAIN[terrain];

    if (movable) {
      this.matrix = this.matrix.set('grid', this.matrix.get('grid').mergeIn([row, column, 'movable'], movable));
    }

    if (isCurrentPlayer && unitProps.name === occupantUnit && (selectedCell.get('row') !== row || selectedCell.get('column') !== column)) {
      this.matrix = this.matrix.set('grid', this.matrix.get('grid').mergeIn([row, column, 'combinable'], true));
    }

    if (!isCurrentPlayer && terrainProps.actionable) {
      this.matrix = this.matrix.set('grid', this.matrix.get('grid').mergeIn([row, column, 'actionable'], true));
    }
  }

  getCell({ row, column }) {
    return this.matrix.getIn(['grid', row, column]);
  }
}

export default BattleMatrix;
