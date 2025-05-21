const mongoose = require('mongoose');

const user =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type : String,
        required:  false, 

    },
    email : {
        type : String,
        required : true,

    },
    username: {
        type : String, 
        required : true,
    },
    likedmusic: {
        type : Array,
        required : false,
    },
    likedplaylists: {
        type: Array,
        required : false, 
    }
});


const UserModel= mongoose.model('User', user);
module.exports = UserModel;