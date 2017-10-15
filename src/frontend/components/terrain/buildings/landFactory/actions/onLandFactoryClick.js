export default function onLandFactoryClick({ row, column }, dispatch) {
  return dispatch({
    row,
    column,
    unit: 'SOLDIER',
    type: 'LAND_FACTORY_CLICK',
  });
}
