module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'actions',
        'status',
        {
          type: Sequelize.INTEGER(1),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
