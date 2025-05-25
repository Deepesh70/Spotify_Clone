const express = require('express');
const router = express.Router();
const passport = require("passport");
const Song = require("../Models/Song");

router.post("/create", passport.authenticate("jwt",{session:false}), async (req, res) => {
    const {title, thumbnail, track}= req.body;
    if(!title || !thumbnail || !track){
        return res 
            .status(301)
            .json({error: "Title, thumbnail, and track are required"});
    }
    const artist = req.user._id;
    const songDetails = {title, thumbnail, track, artist};
    const createSong = await Song.create(songDetails);
    return res.status(200).json(createSong);    
}
); 

router.get("/get/mysongs",
    passport.authenticate("jwt", {session:false}),
    async (req, res) => {
        const currentUser = req.user;
        const songs = await Song.find({artist: req.user._id});
        return res.status(200).json({data: songs});
    }
);

module.exports = router;