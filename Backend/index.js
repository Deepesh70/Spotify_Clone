const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./Models/User');

const app = express();
const authroutes = require('./routes/auth');
const songroutes = require('./routes/song');    
const playlistRoutes = require('./routes/playlist');
const port = 8000;
app.use(express.json());

mongoose.connect("mongodb+srv://Deepesh:"+process.env.MONGO_PASSWORD + 
    "@cluster0.4l8pl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(passport.initialize());
app.get('/', (req, res) =>{
    res.send("Hello World");

});

app.use("/auth", authroutes);
app.use("/song", songroutes);
app.use("/playlist",playlistRoutes); 
app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});

//passport jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({_id: jwt_payload.sub});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));