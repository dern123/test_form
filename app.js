const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const config = require('config');
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || config.get("PORT");
const mongoUrl = config.get('mongoUri');

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.get("/",(req,res) => {
    res.redirect("/home")
  })
app.use(express.static(__dirname + '/client/src'));

app.use(session(({
    secret: config.get("JWR_TOKEN"),
    key: "SID",
    cookie: {
      path:"/",
      httpOnly:true,
      maxAge: null
    },
    store: MongoStore.create({
      mongoUrl,
    }),
    autoRemove : 'interval' ,
    autoRemoveInterval : 120 // Минуты
  })))
  function start(){
    try{
        mongoose.connect(mongoUrl, {});

        server.listen(PORT, () => {
            console.info(`Server started on port: ${PORT}`)
        });
    }catch(err){
        console.error("SERVER EXIT", e)
        process.exit(1);
    }
  }
  start();

  module.exports = app;