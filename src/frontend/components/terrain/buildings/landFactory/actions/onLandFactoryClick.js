export default function onLandFactoryClick({ row, column }) {
  return {
    row,
    column,
    unit: 'SOLDIER',
    type: 'LAND_FACTORY_CLICK',
  };
}
