    const mongoose = require('mongoose');
    
    const Playlist =  new mongoose.Schema({
        title: {
            type: String,
            required: true,
    
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        thumbnail:{
            type: String, 
            required: true, 
    
        },
        songs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "song",
        },
    ],
        Collaboration: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    
    });
    
    
    const PlaylistModel= mongoose.model('Playlist', );
    module.exports = PlaylistModel;