import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { times } from 'lodash';
import UnitFactory from './../units/unitFactory';
import TerrainFactory from './../terrain/terrainFactory';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

import './matrix.scss';

class MatrixView extends Component {
  generateMatrix({ matrix }) {
    return (times(matrix.get('rows'), row => (<tr className="matrix-row" key={`matrix-row-${row}`}>
      {times(matrix.get('columns'), (column) => {
        const cell = matrix.getIn(['grid', row, column]);
        return this.renderCell({ column, row, selected: cell.get('selected'), terrain: cell.get('terrain'), unit: cell.get('unit') });
      })}
    </tr>)));
  }

  renderCell({ terrain, column, row, unit, selected }) {
    const { onCellClick } = this.props;
    const key = `matrix-cell-${column}-${row}-${terrain}`;
    const children = UnitFactory.createUnit({ player: {}, factoryType: 'LAND', unit });
    return (<td
      className={`matrix-cell ${selected ? 'selected' : ''}`}
      key={key}
      onClick={() => onCellClick({ terrain, column, row, unit, matrix: this.props.matrix })}
    >
      {TerrainFactory.createTerrain({ terrain, children })}
    </td>);
  }

  render() {
    const { matrix } = this.props;

    return (<div className="matrix">
      <table className="matrix-table">
        <tbody>
          {this.generateMatrix({ matrix })}
        </tbody>
      </table>
    </div>);
  }
}

MatrixView.propTypes = {
  onCellClick: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixView);
