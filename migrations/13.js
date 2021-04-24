module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'conditions',
        'condition_operator',
        {
          type: Sequelize.STRING(50),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
