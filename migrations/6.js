module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'rule_action_trigger_maps',
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
