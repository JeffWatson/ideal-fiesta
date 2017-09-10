import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { times } from 'lodash';
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
    return (<td
      className={`matrix-cell ${terrain} ${selected ? 'selected' : ''}`}
      key={key}
      onClick={() => onCellClick({ terrain, column, row, unit, matrix: this.props.matrix })}
    >{terrain} occupied by {unit}</td>);
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
