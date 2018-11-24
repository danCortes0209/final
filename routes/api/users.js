const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const Nickname = require("../../models/nickname");
const User = require("../../models/user");


// @route   GET api/users/test
// @desc    tests users route
// @access  public
router.get("/test",(req,res) => res.json({msg:"Users works"}));

// @route   POST api/users/register
// @desc    register an user
// @access  public
router.post("/register", (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    //check validation - Initializa a value from the nickname
    const nick = Nickname;

    if (!isValid) {
        return res.status(400).json(errors);
    }
    //busca en base al email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                //si existe, retorna el error
                return res.status(400).json({email: "email already exists"});
            } else {
                //si no existe, continua a crear un objeto en base al modelo usuario
                const newUser = new User({
                    nickname: nick,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    security: {
                        question: req.body.question,
                        answer: req.body.answer
                    }
                });
                //encripta la contraseña
                bcrypt.genSalt(10, (err, salt) => {

                    //guarda todo en un objeto
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            //si hubo algun error, lo manda a consola
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});


// @route   GET api/users/login
// @desc    log an user
// @access  public
router.post("/login", (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    //checar validacion
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //busca un usuario en base al email
    User.findOne({email: req.body.email})
        .then(user => {
            //si no existe el usuario, manda error
            if (!user) {
                errors.email = "El usuario no existe!";
                return res.status(404).json(errors);
            }
            //compara la contraseña
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    //si coincide, jwt carga el payload y genera una clave o token el cual expirará en 1 hora
                    if (isMatch) {
                        const payload = { id: user.id, nickname: user.nickname};
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err,token) => {
                                //si hubo un error, se manda, de no ser así, manda el token
                                res.json( { success: true, token: 'Bearer ' + token } );
                            }
                        );
                    //si no coincide la contraseña, manda un error de contraseña incorrecta
                    } else {
                        errors.password = "Contraseña incorrecta";
                        res.status(404).json(errors);
                    }
                })
        })
});

//@route    POST/api/users/facebook
//@desc     Register a Facebook user
//@access   public
router.post("/facebook", (req,res) => {
    const nick = Nickname;
    //Busca al usuario en base al email
    User.findOne({email: req.body.email}).then(user =>{
        //Si existe, retorna un token
        if(user){
            const payload = {id: user.id, nickname: user.nickname};
            jwt.sign(
                payload, keys.secretOrKey, { expiresIn: 3600},
                (err, token) =>{
                    //Si hubo un error, se muestra, de no ser así, envia el token
                    res.json({ succes: true, token: 'Bearer ' + token });
                });
        } else {
            //Si no existe, se crea el objeto
            const newUser = new User({
                nickname: nick,
                name: req.body.name,
                facebook_id: req.body.id,
                email: req.body.email
            });
            newUser.save().then(nUser => {
                const payload = {id: nUser.id, nickname: nUser.nickname};
                jwt.sign(
                    payload, keys.secretOrKey, { expiresIn: 3600},
                    (err, token) =>{
                        //Si hubo un error, se muestra, de no ser así, envia el token
                        res.json({ succes: true, token: 'Bearer ' + token });
                    });
            }).catch(err => console.log(err));
        }
    }).catch(err => res.json(err));
});


// @route   GET api/users/current
// @desc    return the current user
// @access  private
router.get("/current", passport.authenticate("jwt", { session: false }), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;