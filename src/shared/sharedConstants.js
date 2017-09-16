export const PLAYERS = {
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  RED: 'RED',
  YELLOW: 'YELLOW',
};

export const TERRAIN = {
  GRASS: {
    name: 'GRASS',
  },
  SAND: {
    name: 'SAND',
  },
  OCEAN: {
    name: 'OCEAN',
  },
  TREE: {
    name: 'TREE',
  },
  MOUNTAIN: {
    name: 'MOUNTAIN',
  },
  CITY: {
    name: 'CITY',
  },
  LAND_FACTORY: {
    name: 'LAND_FACTORY',
  },
  AIR_FACTORY: {
    name: 'AIR_FACTORY',
  },
  SEA_FACTORY: {
    name: 'SEA_FACTORY',
  },
};

const UNIT_TYPES = {
  AIR: 'AIR',
  LAND: 'LAND',
  SEA: 'SEA',
};

export const UNITS = {
  BOMBER: {
    type: 'AIR',
    attacks: [UNIT_TYPES.LAND],
    name: 'BOMBER',
  },
  HELICOPTER: {
    type: 'AIR',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'HELICOPTER',
  },
  JET: {
    type: 'AIR',
    attacks: [UNIT_TYPES.AIR],
    name: 'JET',
  },
  ANTI_AIR: {
    type: 'LAND',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
    name: 'ANTI_AIR',
  },
  ARTILLERY: {
    type: 'LAND',
    attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'ARTILLERY',
  },
  MEDIUM_TANK: {
    type: 'LAND',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'MEDIUM_TANK',
  },
  PERSONNEL_CARRIER: {
    type: 'LAND',
    attacks: [],
    name: 'PERSONNEL_CARRIER',
  },
  SMALL_TANK: {
    type: 'LAND',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'SMALL_TANK',
    stats: {
      range: 1,
      move: 4,
    },
  },
  SOLDIER: {
    type: 'LAND',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'SOLDIER',
    stats: {
      range: 1,
      move: 3,
    },
  },
  CARRIER: {
    type: 'SEA',
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
    name: 'CARRIER',
  },
  DESTROYER: {
    type: 'SEA',
    attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'DESTROYER',
  },
  SUBMARINE: {
    type: 'SEA',
    attacks: [UNIT_TYPES.SEA],
    name: 'SUBMARINE',
  },
};
