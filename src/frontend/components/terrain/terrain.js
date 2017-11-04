import React, { Component } from 'react';
import { bool, func, node, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/controls/button';
import FactoryPurchaseDialog from './buildings/factoryPurchaseDialog';
import TerrainInfoDialog from './terrainInfoDialog';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './terrain.scss';

class Terrain extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onUnitPurchase = this.onUnitPurchase.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      showTerrainInfoDialog: false,
      showPurchaseDialog: false,
    };
  }

  onMouseEnter() {
    if (this.props.isMovementMode) {
      console.log('mouseEntered');
    }
  }

  onMouseLeave() {
    if (this.props.isMovementMode) {
      console.log('mouseLeft');
    }
  }

  onClick() {
    const { onCellSelected, onCellUnselected, onMovementInitiated, onRangeCheck, isCurrentPlayer, isOccupied, isOccupiedByPlayer, selected, disabled } = this.props;

    if (selected) {
      return onCellUnselected(this.props);
    }
    onCellSelected(this.props);

    if (isOccupiedByPlayer && !disabled) {
      return onMovementInitiated(this.props);
    } else if (isOccupied) {
      return onRangeCheck(this.props);
    }

    const state = isCurrentPlayer && !isOccupied ? { showPurchaseDialog: true } : { showTerrainInfoDialog: true };
    return this.setState(state);
  }

  onUnitPurchase(unit) {
    const { onUnitPurchase, row, column, currentPlayer, onCellUnselected } = this.props;

    onUnitPurchase({ unit, row, column, currentPlayer });
    this.closeDialog();
    onCellUnselected(this.props);
  }

  closeDialog() {
    this.setState({
      showPurchaseDialog: false,
      showTerrainInfoDialog: false,
    });
  }

  render() {
    const { children, terrain, selected } = this.props;
    const { showPurchaseDialog, showTerrainInfoDialog } = this.state;
    return (<div className="terrain-container" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
      {selected && showPurchaseDialog && (<FactoryPurchaseDialog
        type="LAND"
        onDialogClose={this.closeDialog}
        onUnitPurchase={this.onUnitPurchase}
      />)}
      {selected && showTerrainInfoDialog && (<TerrainInfoDialog terrain={terrain} onDialogClose={this.closeDialog} />)}
      <Button className="cell-button transparent" onClick={this.onClick}>
        { children }
      </Button>
    </div>);
  }
}

Terrain.propTypes = {
  terrain: shape({
    defenseBonus: number.isRequired,
    actionable: bool,
    selectable: bool,
  }).isRequired,
  isCurrentPlayer: bool.isRequired,
  isOccupied: bool.isRequired,
  isOccupiedByPlayer: bool.isRequired,
  onCellSelected: func.isRequired,
  onCellUnselected: func.isRequired,
  onUnitPurchase: func.isRequired,
  onMovementInitiated: func.isRequired,
  onRangeCheck: func.isRequired,
  children: node,
  row: number.isRequired,
  column: number.isRequired,
  currentPlayer: string.isRequired,
  isMovementMode: bool.isRequired,
  disabled: bool,
  selected: bool,
};

Terrain.defaultProps = {
  children: undefined,
  selected: false,
  disabled: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Terrain);
