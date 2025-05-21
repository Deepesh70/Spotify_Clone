const mongoose = require('mongoose');

const Song =  new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    thumbnail:{
        type: String, 
        required: true, 

    },
    track: {
        type: String,
        required : true,
    },

});


const SongModel= mongoose.model('Song', song);
module.exports = SongModel;