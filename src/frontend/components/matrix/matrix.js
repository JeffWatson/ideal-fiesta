import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { times } from 'lodash';
import classNames from 'classnames';
import UnitFactory from './../units/unitFactory';
import TerrainFactory from './../terrain/terrainFactory';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './matrix.scss';

class MatrixView extends Component {
  generateMatrix({ matrix, currentPlayer }) {
    return (times(matrix.get('rows'), row => (<tr className="matrix-row" key={`matrix-row-${row}`}>
      {times(matrix.get('columns'), (column) => {
        const cell = matrix.getIn(['grid', row, column]);
        return this.renderCell({ column, row, cell, currentPlayer });
      })}
    </tr>)));
  }

  renderCell({ column, row, cell, currentPlayer }) {
    const { onCellClick } = this.props;
    const health = cell.get('health');
    const unit = cell.get('unit');
    const terrain = cell.get('terrain');
    const selected = cell.get('selected');
    const attackable = cell.get('attackable');
    const movable = cell.get('movable');
    const actionable = cell.get('actionable');
    const player = cell.get('player');
    const moveDirection = cell.get('moveDirection');
    const disabled = cell.get('disabled');
    const className = classNames('matrix-cell', { attackable, movable, actionable, selected });

    const key = `matrix-cell-${column}-${row}-${terrain}`;
    const children = UnitFactory.createUnit({ player, factoryType: 'LAND', unit, disabled });
    return (<td
      className={className}
      key={key}
      onClick={() => onCellClick({ terrain,
        column,
        row,
        unit,
        matrix: this.props.matrix,
        currentPlayer,
      })}
    >
      {TerrainFactory.createTerrain({ terrain, children, row, column, health, moveDirection })}
    </td>);
  }

  render() {
    const { matrix } = this.props;
    const currentPlayer = matrix.get('currentPlayer');

    return (<div className="matrix">
      <div className="current-player-info">The current Player is: { currentPlayer }</div>
      <table className="matrix-table">
        <tbody>
          {this.generateMatrix({ matrix, currentPlayer })}
        </tbody>
      </table>
    </div>);
  }
}

// TODO proper propTypes of matrix would be nice.
MatrixView.propTypes = {
  onCellClick: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixView);
