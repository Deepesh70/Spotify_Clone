const ecpress = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../Models/Playlist");
const User= require("../Models/User");
//Route 1 to create a new playlist
router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) => {
    const currentuser = req.user; 
    const { title, thumbnail , songs} =req.body;
    if(!title || !thumbnail || !songs){
        return res.status(301).json({err: "Please provide all the required fields: title, thumbnail, and songs."});
    }
    const playlistData = {
        title,
        thumbnail,
        songs,
        owner: currentuser._id,
        collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
});



//Route 2 get a playlist by ID

router.get("/get/playlist/:playlistId",
    passport.authenticate("jwt", {session:false}),
    async( req, res) => {
        const playlistId = req.params.playlistId;
        const playlist = await Playlist.findOne({_id: playlistId});
        if(!playlist){
            return res.status(404).json({err: "Playlist not found"});
        }
        return res.status(200).json(playlist);
        
    }
);
// Get all playlists made by an artist
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session:false}),async(req, res) =>{
    const artistId = req.params.artistId;
    
    const artist = await User.findOne({_id: artistId});
    if(!artist){
        return res.status(304).json({err:"Invalid artist ID"});
    }
    const playlists= await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlists});

});

//Add a Song to Playlist
router.post("/add/song",
    passport.authenticate("jwt",{session:false}),
    async(req, res)=> {
        const currentUser =req.user;
        const {playlistId, songId}= req.body;
        if(!playlistId || !songId){
            return res.status(304).json({err: "Please provide playlistId and songId"});
        }
        if(
            playlist.owner != currentUser._id &&
            !playlist.collaborators.includes(currentUser._id)
        ){
            return res.status(400).json({err:"Not Allowed"});
        }

        const song = await Song.findOne({_id: songId});
        if(!song){
            return res.status(404).json({err: "Song not found"});
        }
        playlist.songs.push(songId);
        await playlist.save();
        return res.status(200).json({message: "Song added to playlist successfully"});

    }
);

module.exports = router;