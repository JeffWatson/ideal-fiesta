import React, { Component } from 'react';
import { func, node } from 'prop-types';
import { connect } from 'react-redux';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './landFactory.scss';

class LandFactory extends Component {
  onClick() {
    this.props.onLandFactoryClick(this.props);
  }

  render() {
    const { children } = this.props;
    return (<div className={'land-factory-container'} onClick={this.onClick.bind(this)}>
      { children }
    </div>);
  }
}

LandFactory.propTypes = {
  onLandFactoryClick: func.isRequired,
  children: node,
};

LandFactory.defaultProps = {
  children: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandFactory);
