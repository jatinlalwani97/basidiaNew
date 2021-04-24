const express = require("express");
const router = express.Router();
const RequestMap = require("../models/request_map")
const Friend = require("../models/friend")
const sequelize = require("../helpers/mysql");

router.post("/",async function(req,res,next){
    try{
        const requestBody = req.body;

        const request = await RequestMap.create({
            "sent_by": requestBody.sent_by,
            "sent_to": requestBody.sent_to,
            "status": 'pending'
        })

        return res.status(200).send({
            "response": {
              "message": "post created",
              "result": {
                "request": request
              }
            },
          });
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
})

router.put("/:id",async function(req,res,next){
    try{
        const requestId = req.params.id;
        console.log(requestId)
        const request =  await RequestMap.findOne({
            where: {
                "id": Number(requestId),
              }
        })
        console.log(request)
        var values = {status:req.body.status};
        var selector = { where:{ "id": Number(requestId)}};
        if(request){
            await  RequestMap.update(values,selector)
        }

        if(req.body.status == "accepted"){
            Friend.bulkCreate([
          {
              "user_id":request.sent_to,
              "friend_id":request.sent_by,
              "request_id":requestId,
              "created":Math.floor(Date.now()),
              "updated":Math.floor(Date.now()),
          },
          {
            "user_id":request.sent_by,
            "friend_id":request.sent_to,
            "request_id":requestId,
            "created":Math.floor(Date.now()),
            "updated":Math.floor(Date.now()),
        }

            ])
        }
        return res.status(200).send({
            "response": {
              "message": "request updated"
            },
          });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
})
module.exports = router;