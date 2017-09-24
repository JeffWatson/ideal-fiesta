import { isEqual, some } from 'lodash';
import {
  UNITS,
  TERRAIN,
} from '../../../../shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  // TODO get selected unit. check its movement range
  onCellClick({ row, column, currentPlayer }) {
    const cell = this.getCell({ row, column });
    if (!cell.get('movable')) {
      this.deselectAllCells();

      const unit = this.getUnitAt({ row, column });
      const isCurrentPlayer = this.getCell({ row, column }).get('player') === currentPlayer;

      const terrainProps = TERRAIN[this.getTerrainAt({ row, column })];
      if (terrainProps.selectable || (unit && isCurrentPlayer)) {
        this.selectCell({ row, column });
      }

      if (unit) {
        const unitProps = UNITS[unit];
        const stats = unitProps.stats;
        this.calculateMoves({
          row,
          column,
          move: stats.move,
          range: stats.range,
          unitProps,
          currentPlayer,
        });
      }

      if (terrainProps.actionable) {
        this.markActionable({ row, column });
      }
    } else {
      this.updateMovePath({ row, column });
    }

    return this.matrix.get('grid');
  }

  getUnitAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'unit']);
  }

  getTerrainAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'terrain']);
  }

  deselectAllCells() {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn =>
      matrixColumn.merge({
        selected: false,
        attackable: false,
        movable: false,
        visited: false,
        actionable: false,
        moveDirection: false,
        movementTail: false,
      }))));
  }

  resetMovementTail() {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn =>
      matrixColumn.merge({
        movementTail: false,
      }))));
  }

  selectCell({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'selected'], true));
    this.markMovementTail({ row, column });
  }

  markMovementTail({ row, column }) {
    this.resetMovementTail({ row, column });
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'movementTail'], true));
  }

  markMoveDirection({ row, column, moveDirection }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'moveDirection'], moveDirection));
  }

  markActionable({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'actionable'], true));
  }

  updateMoveDirection({ row, column, moveDirection }) {
    this.resetMovementTail({ row, column });
    this.markMovementTail({ row, column });
    this.markMoveDirection({ row, column, moveDirection });
  }

  // TODO this needs serious refactoring... I can probably reuse some logic? not sure. for updating cells.
  // This is terrible. Seriously. What am I doing with myself?
  updateMovePath({ row, column }) {
    const tail = this.getTail();
    const tailColumn = tail.get('column');
    const tailRow = tail.get('row');

    const tailMoveDirection = tail.get('moveDirection');

    // TODO use enum
    let previousDirectionUpdate;
    if (row === tailRow && column - 1 === tailColumn) {
      if (tailMoveDirection === 'NORTH_END') {
        previousDirectionUpdate = 'SOUTH_EAST';
      } else if (tailMoveDirection === 'SOUTH_END') {
        previousDirectionUpdate = 'NORTH_EAST';
      } else if (tailMoveDirection === 'EAST_END') {
        previousDirectionUpdate = 'EAST_WEST';
      } else if (tailMoveDirection === 'WEST_END') { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else {
        console.log('this shouldn\'t be possible... EAST');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: 'EAST_END' });
    } else if (row === tailRow && column + 1 === tailColumn) {
      if (tailMoveDirection === 'NORTH_END') {
        previousDirectionUpdate = 'SOUTH_WEST';
      } else if (tailMoveDirection === 'SOUTH_END') {
        previousDirectionUpdate = 'NORTH_WEST';
      } else if (tailMoveDirection === 'EAST_END') { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === 'WEST_END') {
        previousDirectionUpdate = 'EAST_WEST';
      } else {
        console.log('this shouldn\'t be possible... WEST');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: 'WEST_END' });
    } else if (column === tailColumn && row + 1 === tailRow) {
      if (tailMoveDirection === 'NORTH_END') {
        previousDirectionUpdate = 'NORTH_SOUTH';
      } else if (tailMoveDirection === 'SOUTH_END') { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === 'EAST_END') {
        previousDirectionUpdate = 'NORTH_WEST';
      } else if (tailMoveDirection === 'WEST_END') {
        previousDirectionUpdate = 'NORTH_EAST';
      } else {
        console.log('this shouldn\'t be possible... NORTH');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: 'NORTH_END' });
    } else if (column === tailColumn && row - 1 === tailRow) {
      if (tailMoveDirection === 'NORTH_END') { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === 'SOUTH_END') {
        previousDirectionUpdate = 'NORTH_SOUTH';
      } else if (tailMoveDirection === 'EAST_END') {
        previousDirectionUpdate = 'SOUTH_WEST';
      } else if (tailMoveDirection === 'WEST_END') {
        previousDirectionUpdate = 'SOUTH_EAST';
      } else {
        console.log('this shouldn\'t be possible... SOUTH');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: 'SOUTH_END' });
    } else {
      console.log('hmmm, that\'ll take some thinking....');
    }
  }

  getTail() {
    let tail;
    this.matrix.get('grid').find((matrixRow, row) => matrixRow.find((matrixColumn, column) => {
      if (matrixColumn.get('movementTail')) {
        tail = matrixColumn.merge({ row, column });
        return true;
      }
    }));

    return tail;
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

    const north = { row: row - 1, column, move, range, unitProps, currentPlayer };
    const south = { row: row + 1, column, move, range, unitProps, currentPlayer };
    const west = { row, column: column - 1, move, range, unitProps, currentPlayer };
    const east = { row, column: column + 1, move, range, unitProps, currentPlayer };
    if (north.row >= 0 && !this.isInQueue(queue, north)) {
      queue.push(north);
    }
    if (west.column >= 0 && !this.isInQueue(queue, west)) {
      queue.push(west);
    }
    if (south.row < this.matrix.get('rows') && !this.isInQueue(queue, south)) {
      queue.push(south);
    }
    if (east.column < this.matrix.get('columns') && !this.isInQueue(queue, east)) {
      queue.push(east);
    }
  }

  isInQueue(queue, findMe) {
    return some(queue, object => isEqual(object, findMe));
  }

  // TODO unit combination. take into account health. combine like units with sum of health < MAX_HEALTH
  // TODO terrain modifiers, mountains should be harder to climb, sand too, etc...
  calculateMove({ row, column, move, range, unitProps, currentPlayer }) {
    const cell = this.getCell({ row, column });
    const occupantUnit = cell.get('unit');
    const isCurrentPlayer = cell.get('player') === currentPlayer;

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

    if (movable) {
      this.matrix = this.matrix.set('grid', this.matrix.get('grid').mergeIn([row, column, 'movable'], movable));
    }
  }

  getCell({ row, column }) {
    return this.matrix.getIn(['grid', row, column]);
  }
}

export default BattleMatrix;
