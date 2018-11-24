//libraries
const bprs = require("body-parser");
const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");


//api routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const critics =require("./routes/api/critics");
const places = require("./routes/api/places");

//initialize
const app = express();

//Middle wares
app.use(bprs.urlencoded({extended: false}));//Body parser itself
app.use(bprs.json());                       //Json parser
app.use(passport.initialize());             //passport Middle Ware

//passport config -- Aqui se manda llamar y autoejecutar al archivo passport
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose.connect(db, {useNewUrlParser:true} ).then(() => console.log("Connected")).catch((err) => console.log(err));

//use routes
app.use("/api/users",users);
app.use("/api/profile", profile);
app.use("/api/critics", critics);
app.use("/api/places", places);

//using static files

//initializing server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});