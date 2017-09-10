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
  AIR: {
    BOMBER: {
      attacks: [UNIT_TYPES.LAND],
      name: 'BOMBER',
    },
    HELICOPTER: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'HELICOPTER',
    },
    JET: {
      attacks: [UNIT_TYPES.AIR],
      name: 'JET',
    },
  },
  LAND: {
    ANTI_AIR: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
      name: 'ANTI_AIR',
    },
    ARTILLERY: {
      attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'ARTILLERY',
    },
    MEDIUM_TANK: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'MEDIUM_TANK',
    },
    PERSONNEL_CARRIER: {
      attacks: [],
      name: 'PERSONNEL_CARRIER',
    },
    SMALL_TANK: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'SMALL_TANK',
    },
    SOLDIER: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'SOLDIER',
    },
  },
  SEA: {
    CARRIER: {
      attacks: [UNIT_TYPES.AIR, UNIT_TYPES.LAND],
      name: 'CARRIER',
    },
    DESTROYER: {
      attacks: [UNIT_TYPES.LAND, UNIT_TYPES.SEA],
      name: 'DESTROYER',
    },
    SUBMARINE: {
      attacks: [UNIT_TYPES.SEA],
      name: 'SUBMARINE',
    },
  },
};
