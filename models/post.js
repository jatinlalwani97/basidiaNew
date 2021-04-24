const Sequelize = require('sequelize');
const sequelize = require('../helpers/mysql');

const Post = sequelize.define('posts',{
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    user_id: {
        type: Sequelize.INTEGER(11),
    },
    post_body:{
        type: Sequelize.STRING(500)
    },    
    post_img:{
        type: Sequelize.STRING(500)
    }
});

Post.sync({
    force: false,
  }).then(function() {
    console.log('Post table created');
    return 'created';
  });

module.exports = Post;
