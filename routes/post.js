const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const sequelize = require('../helpers/mysql');


router.post('/',async function(req,res,next){
    try{
        const postBody = req.body;
        
        const post = await Post.create({
            'user_id':postBody.user_id,
            'post_body':postBody.post_body,
            'post_img':postBody.post_img
        })
        return res.status(200).send({
            'response': {
              'message': 'post created',
              'result': {
                'post': post
              }
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});


router.delete('/:id',async function(req,res,next){
    try{
        const postId = req.params.id
        await Post.destroy({
            where: {
                'id': postId,
              },
        })
        return res.status(200).send({
            'response': {
              'message': 'post deleted successfully'
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }

})

module.exports = router;