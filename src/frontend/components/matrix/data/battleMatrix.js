import {
  UNITS,
} from '../../../../shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  onCellClick({ row, column }) {
    this.deselectAllCells();

    const unit = this.getUnitAt({ row, column });
    if (unit) {
      this.selectCell({ row, column });

      const unitProps = UNITS[unit];
      const stats = unitProps.stats;
      this.calculateMoves({ row, column, move: stats.move, range: stats.range, unitProps });
    }

    return this.matrix.get('grid');
  }

  getUnitAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'unit']);
  }

  deselectAllCells() {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn =>
      matrixColumn.merge({
        selected: false,
        attackable: false,
        movable: false,
        visited: false,
      }))));
  }

  selectCell({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'selected'], true));
  }

  calculateMoves({ row, column, move, range, unitProps }) {
    this.calculateMove({ row, column, move, range, unitProps });

    const cell = this.getCell({ row, column });
    if (cell.get('movable') && move >= 0) {
      this.movement({ row, column, move: move - 1, range, unitProps });
    } else if (cell.get('attackable') && move > 0 && range > 1) {
      this.movement({ row, column, move: 0, range: range - 1, unitProps });
    } else if (cell.get('attackable') && !move && range > 1) {
      this.movement({ row, column, move, range: range - 1, unitProps });
    }
  }

  movement({ row, column, move, range, unitProps }) {
    const north = row - 1;
    const south = row + 1;
    const west = column - 1;
    const east = column + 1;
    if (north >= 0) {
      this.calculateMoves({ row: north, column, move, range, unitProps });
    }
    if (west >= 0) {
      this.calculateMoves({ row, column: west, move, range, unitProps });
    }
    if (south < this.matrix.get('rows')) {
      this.calculateMoves({ row: south, column, move, range, unitProps });
    }
    if (east < this.matrix.get('columns')) {
      this.calculateMoves({ row, column: east, move, range, unitProps });
    }
  }

  calculateMove({ row, column, move, range, unitProps }) {
    const cell = this.getCell({ row, column });
    const occupantUnit = cell.get('unit');

    const attackable = range > 0 && occupantUnit ?
      unitProps.attacks.includes(UNITS[occupantUnit].type) : true;

    if (attackable) {
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
