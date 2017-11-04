import { MOVEMENT_INITIATED } from 'actions';

export default function onMovementInitiated({ row, column }) {
  return {
    row,
    column,
    type: MOVEMENT_INITIATED,
  };
}
