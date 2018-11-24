const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const validateCriticInput = require("../../validation/critic");
const validateCommentInput = require("../../validation/comment");
const Critic = require("../../models/critic");

// @route   POST api/critics/
// @desc    create a new critic
// @access  private
router.post("/",passport.authenticate("jwt",{session: false}),(req,res) => {
    const { errors, isValid } = validateCriticInput(req.body);
    //validar campos
    if (!isValid){
        return res.status(400).json(errors);
    }
    const newCritic = new Critic({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text,
        nickname: req.user.nickname,
        place: req.body.place
    });
    newCritic.save().then(critic => res.json(critic)).catch(err => console.log(err));
});

//@route    GET api/critics/
//@desc     find all critics
//@access   public
router.get("/", (req,res) => {
    const errors = { };
    Critic.find()
        .sort({date: -1})
        .then(critics => {
            errors.noCritics = "No existe ninguna critica";
            if (!critics) return res.status(404).json(errors);
            res.json(critics);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/critics/:id
//@desc     find critic by ID
//@access   public
router.get("/:id", (req,res) => {
    const errors = { };
    const {id} = req.params;
    Critic.findById(id)
        .then(critics => {
            errors.noCritics = "No existe ninguna critica";
            if(!critics) return res.status(404).json(errors);
            res.json(critics);
        })
        .catch(err => res.status(404). json(err));
});

//@route    api/critics/place/id
//@desc     get critics by place
//@access   public
router.get("/place/:id", (req, res) => {
    const errors = {},
        {id} = req.params;
    Critic.find({ place: id }).then(critics => {
        errors.noCritics = "no existe ninguna critica";
        critics ? res.json(critics) : res.status(404).json(errors)
    }).catch(err => res.status(404). json(err));
});

//@route    DELETE api/critics/:id
//@desc     borrar critica
//@access   private
router.delete("/:id", passport.authenticate('jwt', {session: false}), (req,res) =>{
    const errors = { };
    Critic.findById(req.params.id)
        .then(critic => {
            if (critic.user.toString() === req.user.id) {
                critic.remove().then(res.json("Success"));
            } else {
                errors.unauthorized = "Usuario no autorizado para borrar eso";
                return res.json(errors.unauthorized);
            }
        }).catch(err => res.json(err))
});

//@route    POST api/critics/comment/:id
//@desc     comentar una critica
//@access   private
router.post("/comment/:id",passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }
    Critic.findById(req.params.id).then(critic => {
        const newComment = {
            text: req.body.text,
            user: req.user.id,
            nickname: req.body.nickname
        };
        critic.comments.unshift(newComment);
        critic.save()
            .then(post => res.json(post))
            .catch(err => res.json(err));
    }).catch(err => res.json(err));
});

//@route    POST api/critics/like/:id
//@desc     like a critic
//@access   private
router.post("/like/:id",passport.authenticate('jwt', {session: false}), (req, res) => {
    Critic.findById(req.params.id).then(critic => {
        if (critic.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
            critic.likes.shift({user: req.user.id});
            critic.save().then(post => res.json(post));
        } else {
            critic.likes.unshift({user: req.user.id});
            critic.save().then(post => res.json(post));
        }
    })
});

module.exports = router;