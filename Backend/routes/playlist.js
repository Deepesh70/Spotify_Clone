const ecpress = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../Models/Playlist");
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

router.get("/get/:playlistId",
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
module.exports = router;