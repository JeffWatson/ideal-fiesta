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
  // TODO use for movement?
  static onMouseEnter() {
    // console.log('mouseEntered');
  }

  static onMouseLeave() {
    // console.log('mouseLeft');
  }

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onUnitPurchase = this.onUnitPurchase.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.state = {
      showBuildingInfoDialog: false,
      showPurchaseDialog: false,
    };
  }

  onClick() {
    const { onCellSelected, isCurrentPlayer, isOccupied, isOccupiedByPlayer } = this.props;

    onCellSelected(this.props);
    const state = isCurrentPlayer && !isOccupied ? { showPurchaseDialog: true } : { showTerrainInfoDialog: true };
    return !isOccupiedByPlayer && this.setState(state);
  }

  onUnitPurchase(unit) {
    const { onUnitPurchase, row, column, currentPlayer } = this.props;

    onUnitPurchase({ unit, row, column, currentPlayer });
    this.closeDialog();
  }

  closeDialog() {
    const { onCellUnselected } = this.props;
    onCellUnselected(this.props);

    this.setState({
      showPurchaseDialog: false,
      showTerrainInfoDialog: false,
    });
  }

  render() {
    const { children, terrain, showDialog } = this.props;
    const { showPurchaseDialog, showTerrainInfoDialog } = this.state;
    return (<div className="terrain-container" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
      {showDialog && showPurchaseDialog && (<FactoryPurchaseDialog
        type="LAND"
        onDialogClose={this.closeDialog}
        onUnitPurchase={this.onUnitPurchase}
      />)}
      {showDialog && showTerrainInfoDialog && (<TerrainInfoDialog terrain={terrain} onDialogClose={this.closeDialog} />)}
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
  children: node,
  row: number.isRequired,
  column: number.isRequired,
  currentPlayer: string.isRequired,
  showDialog: bool.isRequired,
};

Terrain.defaultProps = {
  children: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Terrain);
