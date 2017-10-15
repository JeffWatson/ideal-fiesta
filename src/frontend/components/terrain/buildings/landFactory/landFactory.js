import React, { Component } from 'react';
import { bool, func, node } from 'prop-types';
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
    const { onLandFactoryClick, isCurrentPlayer } = this.props;
    onLandFactoryClick(this.props);
    const state = isCurrentPlayer ? { showPurchaseDialog: true } : { showBuildingInfoDialog: true };
    return this.setState(state);
  }

  render() {
    const { children } = this.props;
    const { showPurchaseDialog, showBuildingInfoDialog } = this.state;
    return (<div className={'land-factory-container'}>
      {showPurchaseDialog && (<FactoryPurchaseDialog type="LAND" onDialogClose={() => this.onDialogCloseClick()} />)}
      {showBuildingInfoDialog && (<TerrainInfoDialog type="LAND_FACTORY" onDialogClose={() => this.onDialogCloseClick()} />)}
      {!showPurchaseDialog && !showBuildingInfoDialog && (<Button className="cell-button transparent" onClick={this.onClick}>
        { children }
      </Button>)}
    </div>);
  }
}

LandFactory.propTypes = {
  isCurrentPlayer: bool.isRequired,
  onLandFactoryClick: func.isRequired,
  children: node,
};

LandFactory.defaultProps = {
  children: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandFactory);
