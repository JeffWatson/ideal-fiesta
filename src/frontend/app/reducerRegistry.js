import matrix from 'components/matrix/reducer/matrixViewReducer';
import currentPlayerHeader from 'components/currentPlayerHeader/reducer/currentPlayerHeaderReducer';
import terrain from 'components/terrain/reducer/terrainReducer';
import app from './reducer/appReducer';

const REDUCERS = {
  app,
  matrix,
  currentPlayerHeader,
  terrain,
};

export default REDUCERS;
