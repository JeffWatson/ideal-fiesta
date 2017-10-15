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
  GRASS: {
    defenseBonus: 0,
  },
  SAND: {
    defenseBonus: 1,
  },
  OCEAN: {
    defenseBonus: 0,
  },
  MOUNTAIN: {
    defenseBonus: 2,
  },
  LAND_FACTORY: {
    defenseBonus: 1,
    actionable: true,
    selectable: true,
  },
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
      attack: 0.8,
      defense: 6,
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
      attack: 0.4,
      defense: 4,
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

export const UNITS_BY_TYPE = {
  AIR: [UNITS.BOMBER, UNITS.JET, UNITS.HELICOPTER],
  LAND: [UNITS.SOLDIER, UNITS.SMALL_TANK, UNITS.PERSONNEL_CARRIER, UNITS.MEDIUM_TANK, UNITS.ARTILLERY, UNITS.ANTI_AIR],
  SEA: [UNITS.CARRIER, UNITS.DESTROYER, UNITS.SUBMARINE],
};

export const MOVE_PATH_VALUES = {
  NORTH_END: 'NORTH_END',
  EAST_END: 'EAST_END',
  SOUTH_END: 'SOUTH_END',
  WEST_END: 'WEST_END',
  NORTH_EAST: 'NORTH_EAST',
  NORTH_SOUTH: 'NORTH_SOUTH',
  NORTH_WEST: 'NORTH_WEST',
  SOUTH_EAST: 'SOUTH_EAST',
  SOUTH_WEST: 'SOUTH_WEST',
  EAST_WEST: 'EAST_WEST',
  ATTACKING: 'ATTACKING',
};

export const MOVE_PATH_TYPES = [
  MOVE_PATH_VALUES.NORTH_END,
  MOVE_PATH_VALUES.EAST_END,
  MOVE_PATH_VALUES.SOUTH_END,
  MOVE_PATH_VALUES.WEST_END,
  MOVE_PATH_VALUES.NORTH_EAST,
  MOVE_PATH_VALUES.NORTH_SOUTH,
  MOVE_PATH_VALUES.NORTH_WEST,
  MOVE_PATH_VALUES.SOUTH_EAST,
  MOVE_PATH_VALUES.SOUTH_WEST,
  MOVE_PATH_VALUES.EAST_WEST,
  MOVE_PATH_VALUES.ATTACKING,
];
