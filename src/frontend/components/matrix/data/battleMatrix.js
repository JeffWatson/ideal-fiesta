import { isEqual, some } from 'lodash';
import {
  UNITS,
  TERRAIN,
  MOVE_PATH_VALUES,
} from '../../../../shared/sharedConstants';

class BattleMatrix {
  constructor({ matrix }) {
    this.matrix = matrix;
  }

  onCellClick({ row, column, currentPlayer }) {
    const cell = this.getCell({ row, column });
    const selectedCell = this.getSelectedCell();
    const disabled = cell.get('disabled');

    if (!selectedCell && !cell.get('movable')) {
      this.deselectAllCells();

      const unit = this.getUnitAt({ row, column });
      const isCurrentPlayer = this.getCell({ row, column }).get('player') === currentPlayer;

      const terrainProps = TERRAIN[this.getTerrainAt({ row, column })];
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

      if (terrainProps.actionable) {
        this.markActionable({ row, column });
      }
    } else if (selectedCell && cell.get('attackable') && !cell.get('moveDirection') && cell.get('unit') && cell.get('player') !== currentPlayer) {
      this.markAttacking({ row, column });
    } else if (selectedCell && cell.get('attackable') && cell.get('moveDirection') === MOVE_PATH_VALUES.ATTACKING && cell.get('unit') && cell.get('player') !== currentPlayer) {
      const tail = this.getTail();
      const tailRow = tail.get('row');
      const tailColumn = tail.get('column');
      this.moveUnit({ row: tailRow, column: tailColumn });
      this.deselectAllCells();
      this.attack({ fromRow: tailRow, fromColumn: tailColumn, toRow: row, toColumn: column });
    } else if ((selectedCell && selectedCell.get('row') === row && selectedCell.get('column') === column) || !selectedCell) {
      this.deselectAllCells();
    } else if (selectedCell && !disabled) {
      this.updateMovePath({ row, column });
    }

    return this.matrix;
  }

  attack({ fromRow, fromColumn, toRow, toColumn }) {
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
    this.matrix = this.matrix.set('grid', this.matrix.get('grid').setIn([row, column, 'moveDirection'], 'ATTACKING'));
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
    return this.matrix.get('grid').reduce((memo, matrixRow) => memo += matrixRow.count(matrixColumn => matrixColumn.get('moveDirection')), 0);
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

  // TODO this needs serious refactoring...
  // I can probably reuse some logic? not sure. for updating cells.
  // This is terrible. Seriously. What am I doing with myself?
  updateMovePath({ row, column }) {
    const tail = this.getTail();
    const previousMoveDistance = this.getMoveDistance();
    const selectedUnitMaxMovement = UNITS[this.getSelectedCell().get('unit')].stats.move;
    const isTailClick = tail.get('row') === row && tail.get('column') === column;

    if (!isTailClick && previousMoveDistance >= selectedUnitMaxMovement) {
      // TODO remove moveable from non-path cells. update attackable to reflect from movement
      return;
    }

    const tailColumn = tail.get('column');
    const tailRow = tail.get('row');
    const tailMoveDirection = tail.get('moveDirection');

    let previousDirectionUpdate;
    if (row === tailRow && column - 1 === tailColumn) {
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.SOUTH_EAST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_EAST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.EAST_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else {
        console.log('this shouldn\'t be possible... EAST');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: MOVE_PATH_VALUES.EAST_END });
    } else if (row === tailRow && column + 1 === tailColumn) {
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.SOUTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.EAST_WEST;
      } else {
        console.log('this shouldn\'t be possible... WEST');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: MOVE_PATH_VALUES.WEST_END });
    } else if (column === tailColumn && row + 1 === tailRow) {
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_SOUTH;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_EAST;
      } else {
        console.log('this shouldn\'t be possible... NORTH');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: MOVE_PATH_VALUES.NORTH_END });
    } else if (column === tailColumn && row - 1 === tailRow) {
      if (tailMoveDirection === MOVE_PATH_VALUES.NORTH_END) { // TODO traveling backwards?
        console.log('you\'re traveling backwards. this is a weird case.');
        previousDirectionUpdate = undefined;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.SOUTH_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.NORTH_SOUTH;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.EAST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.SOUTH_WEST;
      } else if (tailMoveDirection === MOVE_PATH_VALUES.WEST_END) {
        previousDirectionUpdate = MOVE_PATH_VALUES.SOUTH_EAST;
      } else {
        console.log('this shouldn\'t be possible... SOUTH');
      }
      this.markMoveDirection({
        row: tailRow,
        column: tailColumn,
        moveDirection: previousDirectionUpdate });
      this.updateMoveDirection({ row, column, moveDirection: MOVE_PATH_VALUES.SOUTH_END });
    } else if (isTailClick) {
      this.moveUnit({ row, column });
      this.deselectAllCells();
    } else {
      this.deselectAllCells();
    }
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

  // TODO unit combination. take into account health.
  // TODO combine like units with sum of health < MAX_HEALTH
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
