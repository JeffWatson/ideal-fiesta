import React, { Component } from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/controls/button';
import FactoryPurchaseDialog from '../factoryPurchaseDialog';
import TerrainInfoDialog from '../../terrainInfoDialog';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './landFactory.scss';

class LandFactory extends Component {
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
    const { children } = this.props;
    const { showPurchaseDialog, showBuildingInfoDialog } = this.state;
    return (<div className={'land-factory-container'}>
      {showPurchaseDialog && (<FactoryPurchaseDialog
        type="LAND"
        onDialogClose={this.onDialogCloseClick}
        onUnitPurchase={this.onUnitPurchase}
      />)}
      {showBuildingInfoDialog && (<TerrainInfoDialog type="LAND_FACTORY" onDialogClose={this.onDialogCloseClick} />)}
      <Button className="cell-button transparent" onClick={this.onClick}>
        { children }
      </Button>
    </div>);
  }
}

LandFactory.propTypes = {
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

LandFactory.defaultProps = {
  children: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandFactory);
