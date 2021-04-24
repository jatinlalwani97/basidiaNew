module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'rules',
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
