module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'sites',
        'site_url',
        {
          type: Sequelize.STRING(100),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
