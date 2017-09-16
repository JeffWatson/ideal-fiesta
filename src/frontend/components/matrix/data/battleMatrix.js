import {
  UNITS,
  TERRAIN,
  UNIT,
} from '../../../../shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  onCellClick({ row, column }) {
    this.deselectAllCells();
    this.selectCell({ row, column });
    this.markAttackable({ row, column });
    this.markMovable({ row, column });

    return this.matrix.get('grid');
  }

  deselectAllCells() {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn =>
      matrixColumn.merge({
        selected: false,
        attackable: false,
        movable: false,
      }))));
  }

  selectCell({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'selected'], true));
  }

  markAttackable({ row, column }) {
    const unitProps = UNITS[this.matrix.get('grid').getIn([row, column, 'unit'])];
    const stats = unitProps.stats;
    const newGrid = this.matrix.get('grid').map((matrixRow, rowIndex) => matrixRow.map((matrixColumn, columnIndex) => {
      const unitIsAttackable = true; // TODO look at unitProps, find if current cell is attackable.
      const inRange = stats.move + stats.range >= (Math.abs(row - rowIndex) + Math.abs(column - columnIndex));
      const attackable = inRange && unitIsAttackable;
      return matrixColumn.merge({
        attackable,
      });
    }));
    this.matrix = this.matrix.set('grid', newGrid);
  }

  markMovable({ row, column }) {
    const unitProps = UNITS[this.matrix.get('grid').getIn([row, column, 'unit'])];
    const newGrid = this.matrix.get('grid').map((matrixRow, rowIndex) => matrixRow.map((matrixColumn, columnIndex) => {
      const terrainAccessible = true; // TODO look at terrain in unit's Props, if accessible.
      const occupied = this.matrix.getIn(['grid', rowIndex, columnIndex, 'unit']);
      const inRange = unitProps.stats.move >= (Math.abs(row - rowIndex) + Math.abs(column - columnIndex));
      const movable = !occupied && inRange && terrainAccessible;
      return matrixColumn.merge({
        movable,
      });
    }));
    this.matrix = this.matrix.set('grid', newGrid);
  }
}

export default BattleMatrix;
