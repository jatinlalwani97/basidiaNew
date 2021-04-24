const express = require("express");
const router = express.Router();
const Profile = require("../models/profile")
const sequelize = require("../helpers/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup",async function(req,res,next){
    try{
        const profileBody = req.body;
        let password = await bcrypt.hash(req.body.password, 10)
        const profile = await Profile.create({
            "name":profileBody.name,
            "email":profileBody.email,
            "password":password,
            "profile_pic":profileBody.profile_pic,
            "phone_number":profileBody.phone_number
        })
        return res.status(200).send({
            "response": {
              "message": "profile created",
              "result": {
                "profile": profile
              }
            },
          });

    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
router.post("/signin",async function(req,res,next){
	try {
		let user = await Profile.findOne({where:{ email: req.body.email}});
		if (!user) {
			return res.status(401).send({
				"response": {
					"message": "Auth failed"
				}
			})
		}

		let check = await bcrypt.compare(req.body.password, user.password);
		if (check) {
			const accessToken = jwt.sign(
				{
					userId: user.id
				},
				"secretaccess",
				{
					expiresIn: "10m"
				}
			);
      const refreshToken = jwt.sign(
				{
          userId: user.id
				},
				"secretrefresh",
				{
					expiresIn: "1d"
				}
			);
			return res.status(200).send({
				"response": {
					"message": "Auth successful",
					"user": user,
					"access_token": accessToken,
          "refresh_token": refreshToken
				}

			});
		} else {
			return res.status.send({
				"response": {
					"message": "Auth failed"
				}
			})
		}
	} catch (ex) {
		next(ex);
	}
});

router.put("/update/:id",async function(req,res,next){
  try{
    const userId = req.params.id;
    const user =  await Profile.findOne({
        where: {
            "id": Number(userId),
          },
    })
    var values = req.body;
    var selector = { where:{  "id": Number(userId)}};
    if(user){
      await  Profile.update(values,selector)
    }

    return res.status(200).send({
        "response": {
          "message": "user updated"
        },
      });
}
catch (e) {
    console.log(e.message);
    next(e);
}
});

router.post("/token",async function(req,res,next){
  try{
    const token = req.body.token;
    try {
      var decoded = jwt.verify(token, "secretrefresh");
    } catch(err) {
      return res.status(401).send({
        "response": {
          "message": "user unauthorized"
        },
      });
    }
    const accessToken = jwt.sign(
      {
        userId: decoded.userId
      },
      "secretaccess",
      {
        expiresIn: "10m"
      }
    );

    return res.status(200).send({
        "response": {
          "message": "user updated",
          "token":accessToken
        },
      });
}
catch (e) {
    console.log(e.message);
    next(e);
}
});
module.exports = router;