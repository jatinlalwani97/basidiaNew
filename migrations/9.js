module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'rules',
        'rule_status',
        {
          type: Sequelize.INTEGER(1),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
