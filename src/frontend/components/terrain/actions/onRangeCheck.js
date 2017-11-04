import { RANGE_CHECK } from 'actions';

export default function onRangeCheck({ row, column }) {
  return {
    row,
    column,
    type: RANGE_CHECK,
  };
}