const express = require('express');
const _ = require('lodash');
const router = express.Router();
const RequestMap = require('../models/request_map')
const Friend = require('../models/friend')
const Profile = require('../models/profile')
const sequelize = require('../helpers/mysql');
var pluck = require('arr-pluck');

router.delete('/:id',async function(req,res,next){
    try{
        const requestId = req.params.id;

        await Friend.destroy({
            where: {
                'request_id': requestId,
              },
        })
        await RequestMap.destroy({
            where: {
                'id': requestId,
              },
        })
        return res.status(200).send({
            "response": {
              "message": "friend removed"
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
})

router.get('/:id',async function(req,res,next){
    try{
        const userId = req.params.id;
        var friends = await sequelize.query('SELECT * FROM friends INNER JOIN profiles ON friends.friend_id = profiles.id where friends.user_id = ?',{
            replacements: [Number(userId)],
          })
          return res.status(200).send({
            "response": {
              "message": "friends fetched",
              'friends':friends[0]
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
})

router.get('/mutual/:user_id/:friend_id',async function(req,res,next){
    try{
        const userId = req.params.user_id;
        const friendId = req.params.friend_id;
        var userFriends = await Friend.findAll({
            where: {
                user_id: userId
            },
            attributes: ['friend_id'],
            raw : true
        })
        userFriends = pluck(userFriends, 'friend_id')
        var otherFriends = await Friend.findAll({
            where: {
                user_id: friendId
            },
            attributes: ['friend_id'],
            raw : true
        })
        otherFriends = pluck(otherFriends, 'friend_id')
        

        var users = await Profile.findAll({
            where: {
                id: _.intersection(userFriends,otherFriends)
            }
        })
          return res.status(200).send({
            "response": {
              "message": "mutual friends fetched",
              'friends':users
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
})

router.get('/tree/:id',async function(req,res,next){
    try{
        const userId = req.params.id;
        var userFriends = await Friend.findAll({
            where: {
                user_id: userId
            },
            attributes: ['friend_id'],
            raw : true
        })
        userFriends = pluck(userFriends, 'friend_id');
        var otherFriends = await Friend.findAll({
            where: {
                user_id: userFriends
            },
            attributes: ['friend_id'],
            raw : true
        })
        otherFriends = pluck(otherFriends, 'friend_id')
        var users = await Profile.findAll({
            where: {
                id: otherFriends
            }
        })
          return res.status(200).send({
            "response": {
              "message": "mutual friends fetched",
              'friends':users
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
})

module.exports = router;