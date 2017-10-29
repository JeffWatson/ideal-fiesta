import { CELL_SELECTED } from 'actions';

export default function onCellSelected({ row, column }) {
  return {
    row,
    column,
    type: CELL_SELECTED,
  };
}
