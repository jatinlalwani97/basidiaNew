const Sequelize = require('sequelize');
const sequelize = require('../helpers/mysql');

const Profile = sequelize.define('profiles', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(500),
  },
  email:{
      type: Sequelize.STRING(500),
      unique: true,
      allowNull: false,
  },
  password:{
      type: Sequelize.STRING(500)
  },
  token:{
      type: Sequelize.STRING(500)
  },
  profile_pic:{
    type: Sequelize.STRING(500)
  },
  phone_number:{
    type: Sequelize.INTEGER(10)
  }
}
);
Profile.sync({
    force: false,
  }).then(function() {
    console.log('Post table created');
    return 'created';
  });

module.exports = Profile;