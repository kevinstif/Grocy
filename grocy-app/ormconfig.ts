module.exports = {
  type: 'mysql',
  url: process.env.GROCY_NEST,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
/*<<<<<<< HEAD
    migrationsDir: 'src/common/infrastructure/migrations',
  },
};
=======*/
    migrationsDir: 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};

//>>>>>>> origin/feature-suppliers
function getEntityDirectory() {
  let path = 'dist/src/**/infrastructure/persistence/typeorm/entities/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/**/infrastructure/persistence/typeorm/entities/*.ts';
  }
  return path;
}

function getMigrationDirectory() {
  let path = 'dist/src/common/infrastructure/persistence/typeorm/migrations/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/common/infrastructure/persistence/typeorm/migrations/*.ts';
  }
  return path;
}
