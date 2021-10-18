const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const port = process.env.PORT;
// const host = process.env.HOST;
const {host, port, db, authApiUrl} = require("./configuration");
const axios = require("axios")
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
        console.log('authApiUrl', authApiUrl)
    });
}

app.get('/test', (req, res) => {
    res.send('Our api server and authApiUrl = ' +authApiUrl);
});

app.get('/api/testapidata', (req, res) =>{
    res.json({
        testwithapi: true
    })
})

app.get('/testwithcurrenuser', (req, res) => {
    // console.log('authApiUrl', authApiUrl)
    axios.get(authApiUrl + '/currentUser')
        .then(response => {
            res.json({
                testwithcurrenuser: true,
                currentUserFromAuth: response.data
            })
        })

});



connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)