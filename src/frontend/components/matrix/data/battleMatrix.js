class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  deselectAllCells() {
    return this.matrix.get('grid').map(matrixRow => matrixRow.map(matrixColumn => matrixColumn.set('selected', false)));
  }

  selectCell({ row, column }) {
    // TODO calculate spaces "attackable" and "movable"
    return this.deselectAllCells().setIn([row, column, 'selected'], true);
  }
}

export default BattleMatrix;
