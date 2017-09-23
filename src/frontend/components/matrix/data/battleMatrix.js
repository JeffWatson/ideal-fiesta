import { isEqual, some } from 'lodash';
import {
  UNITS,
  TERRAIN,
} from '../../../../shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  onCellClick({ row, column, currentPlayer }) {
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
      this.calculateMoves({ row, column, move: stats.move, range: stats.range, unitProps, currentPlayer });
    }

    if (terrainProps.actionable) {
      this.markActionable({ row, column });
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
      }))));
  }

  selectCell({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'selected'], true));
  }

  markActionable({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'actionable'], true));
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
