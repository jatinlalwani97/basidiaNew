
module.exports = {
    up: function(queryInterface, Sequelize) {   
      return queryInterface.bulkInsert('action_trigger_maps', [{
        action_id:1,
        trigger_id:2,
        created: Math.floor(Date.now()),
        updated: Math.floor(Date.now()),
      }]);
    },
    down: function(queryInterface, Sequelize) {
      return 'failed'
    }
  };    