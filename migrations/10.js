module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'rules',
        'uid',
        {
          type: Sequelize.INTEGER(11),
        },
    );
  },
  down: (queryInterface, Sequelize) => {
    return 'failed';
  },
};
