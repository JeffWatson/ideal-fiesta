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
    this.onDialogCloseClick = this.onDialogCloseClick.bind(this);
    this.state = {
      showBuildingInfoDialog: false,
      showPurchaseDialog: false,
    };
  }

  onDialogCloseClick() {
    this.setState({
      showPurchaseDialog: false,
      showBuildingInfoDialog: false,
    });
  }

  onClick() {
    const { onLandFactoryClick, isCurrentPlayer, isOccupied, isOccupiedByPlayer } = this.props;
    if (isOccupiedByPlayer) {
      return null;
    }
    onLandFactoryClick(this.props);
    const state = isCurrentPlayer && !isOccupied ? { showPurchaseDialog: true } : { showBuildingInfoDialog: true };
    return this.setState(state);
  }

  onUnitPurchase(unit) {
    const { onUnitPurchase, row, column, currentPlayer } = this.props;

    onUnitPurchase({ unit, row, column, currentPlayer });
    this.onDialogCloseClick();
  }

  render() {
    const { children, terrain } = this.props;
    const { showPurchaseDialog, showBuildingInfoDialog } = this.state;
    return (<div className="terrain-container" >
      {showPurchaseDialog && (<FactoryPurchaseDialog
        type="LAND"
        onDialogClose={this.onDialogCloseClick}
        onUnitPurchase={this.onUnitPurchase}
      />)}
      {showBuildingInfoDialog && (<TerrainInfoDialog terrain={terrain} onDialogClose={this.onDialogCloseClick} />)}
      <Button className="cell-button transparent" onClick={this.onClick}>
        { children }
      </Button>
    </div>);
  }
}

Terrain.propTypes = {
  terrain: shape({
    defenseBonus: number.isRequired,
    actionable: bool.isRequired,
    selectable: bool.isRequired,
  }).isRequired,
  isCurrentPlayer: bool.isRequired,
  isOccupied: bool.isRequired,
  isOccupiedByPlayer: bool.isRequired,
  onLandFactoryClick: func.isRequired,
  onUnitPurchase: func.isRequired,
  children: node,
  row: number.isRequired,
  column: number.isRequired,
  currentPlayer: string.isRequired,
};

Terrain.defaultProps = {
  children: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Terrain);
