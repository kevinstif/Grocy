module.exports = {
  type: 'mysql',
  url: process.env.GROCY_NEST,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/common/infrastructure/migrations',
  },
};
function getEntityDirectory() {
  let path = 'dist/src/**/infrastructure/persistence/schemas/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/**/infrastructure/persistence/schemas/*.ts';
  }
  return path;
}

function getMigrationDirectory() {
  let path = 'dist/src/common/infrastructure/migrations/*.js';
  if (process.env.NODE_ENV === 'migration') {
    path = 'src/common/infrastructure/migrations/*.ts';
  }
  return path;
}
