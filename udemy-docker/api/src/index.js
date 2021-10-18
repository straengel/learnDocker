const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const port = process.env.PORT;
// const host = process.env.HOST;
const {host, port, db} = require("./configuration");
const {connectDb} = require("./helper/db");
const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {

        console.log(`start server ${port}`);
        console.log(`start server host ${host}`);
        console.log(`Mongo ${db}`);
        // Post.find(function(error, post) {
        //     if(error) return console.error(error);
        //     console.log('post', post)
        // })
        const silence = new Post({name: 'Silence'});
        // console.log(silence.name);
        silence.save(function(err, savedSilence){
            if(err) return console.error(err);
            console.log('savedSilence!', savedSilence);
        })
    });
}

console.log('PORT', port)
app.get('/test', (req, res) => {
    res.send('Our api server');
});



connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)