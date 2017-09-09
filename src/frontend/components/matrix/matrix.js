import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { times } from 'lodash';
import mapStateToProps from './selector/mapStateToProps';
import mapDispatchToProps from './actions/mapDispatchToProps';

class MatrixView extends Component {
  generateMatrix({ matrix }) {
    return (times(matrix.get('rows'), row => (<tr className="matrix-row" key={`matrix-row-${row}`}>
      {times(matrix.get('columns'), (column) => {
        const cell = matrix.get('grid')[row][column];
        return this.renderCell({ column, row, terrain: cell.terrain, unit: cell.unit });
      })}
    </tr>)));
  }

  renderCell({ terrain, column, row, unit }) {
    const { onCellClick } = this.props;
    const key = `matrix-cell-${column}-${row}-${terrain}`;
    return (<td
      className={`matrix-cell ${terrain}`}
      key={key}
      onClick={() => onCellClick({ terrain, column, row, unit, matrix: this.props.matrix })}
    >{terrain} occupied by {unit}</td>);
  }

  render() {
    const { matrix } = this.props;
    return (<div className="matrix-view">
      <table>
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
