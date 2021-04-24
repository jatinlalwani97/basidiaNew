module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'auths',
        'site_id',
        {
          type: Sequelize.STRING(100),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
