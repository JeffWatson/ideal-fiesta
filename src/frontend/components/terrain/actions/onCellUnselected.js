import { CELL_UNSELECTED } from 'actions';

export default function onCellUnselected({ row, column }) {
  return {
    row,
    column,
    type: CELL_UNSELECTED,
  };
}
