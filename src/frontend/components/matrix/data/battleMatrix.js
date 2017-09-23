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

  calculateMoves({ row, column, move, range, unitProps, currentPlayer }) {
    this.calculateMove({ row, column, move, range, unitProps, currentPlayer });

    const cell = this.getCell({ row, column });
    if (cell.get('movable') && move >= 0) {
      this.movement({ row, column, move: move - 1, range, unitProps, currentPlayer });
    } else if (cell.get('attackable') && move > 0 && range > 1) {
      this.movement({ row, column, move: 0, range: range - 1, unitProps, currentPlayer });
    } else if (cell.get('attackable') && !move && range > 1) {
      this.movement({ row, column, move, range: range - 1, unitProps, currentPlayer });
    }
  }

  // TODO for performance, use queue?
  // TODO take in to account selected state. Don't add movable, attackable. Actionable, yes.
  movement({ row, column, move, range, unitProps, currentPlayer }) {
    const north = row - 1;
    const south = row + 1;
    const west = column - 1;
    const east = column + 1;
    if (north >= 0) {
      this.calculateMoves({ row: north, column, move, range, unitProps, currentPlayer });
    }
    if (west >= 0) {
      this.calculateMoves({ row, column: west, move, range, unitProps, currentPlayer });
    }
    if (south < this.matrix.get('rows')) {
      this.calculateMoves({ row: south, column, move, range, unitProps, currentPlayer });
    }
    if (east < this.matrix.get('columns')) {
      this.calculateMoves({ row, column: east, move, range, unitProps, currentPlayer });
    }
  }

  // TODO unit combination. take into account health. combine like units with sum of health < MAX_HEALTH
  calculateMove({ row, column, move, range, unitProps, currentPlayer }) {
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
