const Sequelize = require('sequelize');
const sequelize = require('../helpers/mysql');

const RequestMap = sequelize.define('request_map',{
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    sent_by: {
        type: Sequelize.INTEGER(11)
    },
    sent_to:{
        type:Sequelize.INTEGER(11)
    },
    status:{
        type: Sequelize.STRING(500),
        defaultValue: "pending"
    }
})
RequestMap.sync({
    force: false,
  }).then(function() {
    console.log('request_map table created');
    return 'created';
  });
  
  module.exports = RequestMap;
  