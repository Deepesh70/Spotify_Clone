const Playlist = require("../Models/Playlist");
const User = require("../Models/User");
const Song = require("../Models/Song");

// Controller function to create a new playlist
const createPlaylist = async (req, res) => {
    try {
        const currentuser = req.user; 
        const { title, thumbnail , songs} = req.body;
        
        if(!title || !thumbnail || !songs){
            return res.status(400).json({err: "Please provide all the required fields: title, thumbnail, and songs."});
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
    } catch (error) {
        return res.status(500).json({err: "Internal server error", details: error.message});
    }
};

// Controller function to get a playlist by ID
const getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const playlist = await Playlist.findOne({_id: playlistId});
        
        if(!playlist){
            return res.status(404).json({err: "Playlist not found"});
        }
        
        return res.status(200).json(playlist);
    } catch (error) {
        return res.status(500).json({err: "Internal server error", details: error.message});
    }
};

// Controller function to get all playlists made by an artist
const getPlaylistsByArtist = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        
        const artist = await User.findOne({_id: artistId});
        if(!artist){
            return res.status(400).json({err:"Invalid artist ID"});
        }
        
        const playlists = await Playlist.find({owner: artistId});
        return res.status(200).json({data: playlists});
    } catch (error) {
        return res.status(500).json({err: "Internal server error", details: error.message});
    }
};

// Controller function to add a song to playlist
const addSongToPlaylist = async (req, res) => {
    try {
        const currentUser = req.user;
        const {playlistId, songId} = req.body;
        
        if(!playlistId || !songId){
            return res.status(400).json({err: "Please provide playlistId and songId"});
        }
        
        const playlist = await Playlist.findOne({_id: playlistId});
        if(!playlist){
            return res.status(404).json({err: "Playlist not found"});
        }
        
        if(
            playlist.owner != currentUser._id &&
            !playlist.collaborators.includes(currentUser._id)
        ){
            return res.status(403).json({err:"Not Allowed"});
        }

        const song = await Song.findOne({_id: songId});
        if(!song){
            return res.status(404).json({err: "Song not found"});
        }
        
        playlist.songs.push(songId);
        await playlist.save();
        return res.status(200).json({message: "Song added to playlist successfully"});
    } catch (error) {
        return res.status(500).json({err: "Internal server error", details: error.message});
    }
};

module.exports = {
    createPlaylist,
    getPlaylistById,
    getPlaylistsByArtist,
    addSongToPlaylist
};
