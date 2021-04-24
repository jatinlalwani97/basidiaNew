const Sequelize = require('sequelize');
const sequelize = require('../helpers/mysql');

const Friend = sequelize.define('friend',{
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER(11)
    },
    friend_id:{
        type:Sequelize.INTEGER(11)
    },
    request_id:{
        type:Sequelize.INTEGER(11)
    }
})
Friend.sync({
    force: false,
  }).then(function() {
    console.log('friend table created');
    return 'created';
  });
  
  module.exports = Friend;
  