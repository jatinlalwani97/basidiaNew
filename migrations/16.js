
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('triggers', [{
      event_type: 'user_updated',
      event_name: 'User updated',
      event_description: 'User updated',
      status :1,
      created: Math.floor(Date.now()),
      updated: Math.floor(Date.now()),
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return 'failed'
  }
};