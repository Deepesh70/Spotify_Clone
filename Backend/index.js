const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 8000;

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

app.get('/', (req, res) =>{
    res.send("Hello World");

});

app.listen(port, () =>{
    console.log('Server is running on port ' + port);
});