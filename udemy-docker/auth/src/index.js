const express = require("express");
const app = express();
const axios = require('axios');
// const port = process.env.PORT;
// const host = process.env.HOST;
const {host, port, db, apiUrl} = require("./configuration");
const {connectDb} = require("./helper/db");


const startServer = () => {
    app.listen(port, () => {

        console.log(`start auth ешьуserver ${port}`);
        console.log(`start server host ${host}`);
        console.log(`Mongo ${db}`);
    });
}

app.get('/test', (req, res) => {
    res.send('Our api server');
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '1',
        email: 'foo@gmail.com'
    })
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata')
        .then(response => {
            res.json({
                testapidata: response.data.testwithapi
            })
        })
})

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)