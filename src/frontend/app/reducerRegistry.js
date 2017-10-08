import matrix from 'components/matrix/reducer/matrixViewReducer';
import currentPlayerHeader from 'components/currentPlayerHeader/reducer/currentPlayerHeaderReducer';
import app from './reducer/appReducer';

const REDUCERS = {
  app,
  matrix,
  currentPlayerHeader,
};

export default REDUCERS;
