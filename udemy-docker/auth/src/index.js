const express = require("express");
const app = express();
// const port = process.env.PORT;
// const host = process.env.HOST;
const {host, port, db} = require("./configuration");
const {connectDb} = require("./helper/db");


const startServer = () => {
    app.listen(port, () => {

        console.log(`start auth ешьуserver ${port}`);
        console.log(`start server host ${host}`);
        console.log(`Mongo ${db}`);
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