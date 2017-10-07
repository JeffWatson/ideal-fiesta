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

  onCellClick({ row, column, currentPlayer }) {
    const cell = this.getCell({ row, column });
    const selectedCell = this.getSelectedCell();
    const disabled = cell.get('disabled');
    const movable = cell.get('movable');
    const attackable = cell.get('attackable');
    const moveDirection = cell.get('moveDirection');
    const unit = cell.get('unit');
    const isCurrentPlayer = cell.get('player') === currentPlayer;
    const terrainProps = TERRAIN[this.getTerrainAt({ row, column })];

    if (!selectedCell) {
      this.deselectAllCells();
      if (!movable) {
        this.handleNoSelectionNotMovable({ row, column, terrainProps, unit, isCurrentPlayer, currentPlayer, disabled });
      }
    } else {
      this.handleSelectedCellClick({ row, column, selectedCell, isCurrentPlayer, unit, moveDirection, attackable, disabled });
    }

    return this.matrix;
  }

  handleSelectedCellClick({ row, column, selectedCell, isCurrentPlayer, unit, moveDirection, attackable, disabled }) {
    if (attackable && !moveDirection && unit && !isCurrentPlayer) { // clicking on enemy
      this.markAttacking({ row, column });
    } else if (attackable && moveDirection === MOVE_PATH_VALUES.ATTACKING && unit && !isCurrentPlayer) { // attacking enemy
      const tail = this.getTail();
      const tailRow = tail.get('row');
      const tailColumn = tail.get('column');
      this.moveUnit({ row: tailRow, column: tailColumn });
      this.deselectAllCells();
      this.executeAttack({ fromRow: tailRow, fromColumn: tailColumn, toRow: row, toColumn: column });
    } else if (selectedCell.get('row') === row && selectedCell.get('column') === column) { // deselecting selected unit
      this.deselectAllCells();
    } else if (!disabled) { // movement
      this.updateMovePath({ row, column });
    }
  }

  handleNoSelectionNotMovable({ row, column, terrainProps, unit, isCurrentPlayer, currentPlayer, disabled }) {
    if (terrainProps.actionable) {
      this.markActionable({ row, column });
    }

    if (terrainProps.selectable || (unit && isCurrentPlayer && !disabled)) {
      this.selectCell({ row, column });
    }

    if (unit && !disabled) {
      const unitProps = UNITS[unit];
      const stats = unitProps.stats;
      this.matrix = this.matrix.set('activeUnit', { row, column });
      this.calculateMoves({
        row,
        column,
        move: stats.move,
        range: stats.range,
        unitProps,
        currentPlayer,
      });
    }
  }

  executeAttack({ fromRow, fromColumn, toRow, toColumn }) {
    const playerStats = UNITS[this.getUnitAt({ row: fromRow, column: fromColumn })].stats;
    const enemyStats = UNITS[this.getUnitAt({ row: toRow, column: toColumn })].stats;
    const playerTerrain = TERRAIN[this.getTerrainAt({ row: fromRow, column: fromColumn })];
    const enemyTerrain = TERRAIN[this.getTerrainAt({ row: toRow, column: toColumn })];
    const playerHealth = this.getHealthAt({ row: fromRow, column: fromColumn });
    const enemyHealth = this.getHealthAt({ row: toRow, column: toColumn });

    const attackPower = (playerStats.attack * playerHealth) - (enemyStats.defense + enemyTerrain.defenseBonus);
    const enemyNewHealth = enemyHealth - attackPower;

    const rebuttlePower = (enemyStats.attack * enemyNewHealth) - (playerStats.defense + playerTerrain.defenseBonus);
    const playerNewHealth = enemyNewHealth <= 0 ? playerHealth : playerHealth - (rebuttlePower > 0 ? rebuttlePower : 0);

    this.updateHealthAt({ row: fromRow, column: fromColumn, health: playerNewHealth });
    this.updateHealthAt({ row: toRow, column: toColumn, health: enemyNewHealth });
  }

  updateHealthAt({ row, column, health }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'health'], health));
  }

  getUnitAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'unit']);
  }

  getHealthAt({ row, column }) {
    return this.matrix.getIn(['grid', row, column, 'health']);
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
        attacking: false,
        combinable: false,
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

  markAttacking({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'moveDirection'], MOVE_PATH_VALUES.ATTACKING));
  }

  markActionable({ row, column }) {
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'actionable'], true));
  }

  updateMoveDirection({ row, column, moveDirection }) {
    this.resetMovementTail({ row, column });
    this.markMovementTail({ row, column });
    this.markMoveDirection({ row, column, moveDirection });
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

  updateMovePath({ row, column }) {
    const tail = this.getTail();
    const previousMoveDistance = this.getMoveDistance();
    const selectedUnitMaxMovement = UNITS[this.getSelectedCell().get('unit')].stats.move;
    const tailColumn = tail.get('column');
    const tailRow = tail.get('row');
    const isTailClick = tailRow === row && tailColumn === column;

    if (isTailClick) {
      this.deselectAllCells();
      this.moveUnit({ row, column });
      return;
    }

    if (previousMoveDistance >= selectedUnitMaxMovement) {
      return;
    }

    const tailMoveDirection = tail.get('moveDirection');
    const east = column - 1;
    const north = row + 1;
    let previousDirectionUpdate;
    let moveDirection;
    if (row === tailRow) {
      moveDirection = east === tailColumn ? MOVE_PATH_VALUES.EAST_END : MOVE_PATH_VALUES.WEST_END;
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) {
        previousDirectionUpdate = east === tailColumn ? MOVE_PATH_VALUES.SOUTH_EAST : MOVE_PATH_VALUES.SOUTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) {
        previousDirectionUpdate = east === tailColumn ? MOVE_PATH_VALUES.NORTH_EAST : MOVE_PATH_VALUES.NORTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) {
        previousDirectionUpdate = east === tailColumn ? MOVE_PATH_VALUES.EAST_WEST : undefined;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) {
        previousDirectionUpdate = east === tailColumn ? undefined : MOVE_PATH_VALUES.EAST_WEST;
      }
    } else if (column === tailColumn) {
      moveDirection = north === tailRow ? MOVE_PATH_VALUES.NORTH_END : MOVE_PATH_VALUES.SOUTH_END;
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) {
        previousDirectionUpdate = north === tailRow ? MOVE_PATH_VALUES.NORTH_SOUTH : undefined;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) {
        previousDirectionUpdate = north === tailRow ? undefined : MOVE_PATH_VALUES.NORTH_SOUTH;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) {
        previousDirectionUpdate = north === tailRow ? MOVE_PATH_VALUES.NORTH_WEST : MOVE_PATH_VALUES.SOUTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) {
        previousDirectionUpdate = north === tailRow ? MOVE_PATH_VALUES.NORTH_EAST : MOVE_PATH_VALUES.SOUTH_EAST;
      }
    } else {
      this.deselectAllCells();
    }

    this.markMoveDirection({
      row: tailRow,
      column: tailColumn,
      moveDirection: previousDirectionUpdate,
    });
    this.updateMoveDirection({ row, column, moveDirection });
  }

  moveUnit({ row, column }) {
    const activeUnit = this.matrix.get('activeUnit');
    const cell = this.matrix.getIn(['grid', activeUnit.row, activeUnit.column]);

    this.matrix = this.matrix.mergeIn(['grid', row, column], { unit: cell.get('unit'), player: cell.get('player'), disabled: true, health: cell.get('health') });
    this.matrix = this.matrix.mergeIn(['grid', activeUnit.row, activeUnit.column], { unit: undefined, player: undefined, health: undefined });
  }

  getTail() {
    let tail;
    this.matrix.get('grid').find((matrixRow, row) => matrixRow.find((matrixColumn, column) => {
      if (matrixColumn.get('movementTail')) {
        tail = matrixColumn.merge({ row, column });
        return true;
      }
      return false;
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
    const occupantUnit = cell.get('unit');
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
