module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'triggers',
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
