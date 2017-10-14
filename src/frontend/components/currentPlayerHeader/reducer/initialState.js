// TODO remove from here. Shouldn't exist. Move to tests only location
import { fromJS } from 'immutable';

export default fromJS({
  enabled: false,
  currentPlayer: {
    username: 'bananaMan',
    avatarUrl: './favicon.ico',
    status: {
      money: 1000,
      specialPoints: 90,
    },
  },
});
