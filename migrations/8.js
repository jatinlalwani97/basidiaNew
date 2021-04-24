module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'conditions',
        'is_hidden',
        {
          type: Sequelize.INTEGER(1),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
