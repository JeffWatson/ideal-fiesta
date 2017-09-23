export const PLAYERS = {
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  RED: 'RED',
  YELLOW: 'YELLOW',
};

export const TERRAIN_TYPES = {
  GRASS: 'GRASS',
  SAND: 'SAND',
  OCEAN: 'OCEAN',
  TREE: 'TREE',
  MOUNTAIN: 'MOUNTAIN',
  CITY: 'CITY',
  LAND_FACTORY: 'LAND_FACTORY',
  AIR_FACTORY: 'AIR_FACTORY',
  SEA_FACTORY: 'SEA_FACTORY',
};

export const TERRAIN = {
  GRASS: {},
  SAND: {},
  OCEAN: {},
  MOUNTAIN: {},
};

const UNIT_TYPES = {
  AIR: 'AIR',
  LAND: 'LAND',
  SEA: 'SEA',
};

export const UNITS = {
  BOMBER: {
    type: UNIT_TYPES.AIR,
    attacks: [UNIT_TYPES.LAND],
    name: 'BOMBER',
  },
  HELICOPTER: {
    type: UNIT_TYPES.AIR,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'HELICOPTER',
  },
  JET: {
    type: UNIT_TYPES.AIR,
    attacks: [UNIT_TYPES.AIR],
    name: 'JET',
  },
  ANTI_AIR: {
    type: UNIT_TYPES.LAND,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
    name: 'ANTI_AIR',
  },
  ARTILLERY: {
    type: UNIT_TYPES.LAND,
    attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'ARTILLERY',
    inaccessibleTerrain: [TERRAIN_TYPES.OCEAN, TERRAIN_TYPES.MOUNTAIN],
    stats: {
      range: 2,
      move: 4,
    },
  },
  MEDIUM_TANK: {
    type: UNIT_TYPES.LAND,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'MEDIUM_TANK',
  },
  PERSONNEL_CARRIER: {
    type: UNIT_TYPES.LAND,
    attacks: [],
    name: 'PERSONNEL_CARRIER',
  },
  SMALL_TANK: {
    type: UNIT_TYPES.LAND,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'SMALL_TANK',
    inaccessibleTerrain: [TERRAIN_TYPES.OCEAN, TERRAIN_TYPES.MOUNTAIN],
    stats: {
      range: 1,
      move: 4,
    },
  },
  SOLDIER: {
    type: UNIT_TYPES.LAND,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'SOLDIER',
    inaccessibleTerrain: [TERRAIN_TYPES.OCEAN],
    stats: {
      range: 1,
      move: 3,
    },
  },
  CARRIER: {
    type: UNIT_TYPES.SEA,
    attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
    name: 'CARRIER',
  },
  DESTROYER: {
    type: UNIT_TYPES.SEA,
    attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
    name: 'DESTROYER',
  },
  SUBMARINE: {
    type: UNIT_TYPES.SEA,
    attacks: [UNIT_TYPES.SEA],
    name: 'SUBMARINE',
  },
};