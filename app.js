const express = require("express");
const session = require('express-session');
const path = require('path');
const mongoose = require("mongoose");
const cors = require('cors');
const config = require('config');
const passport = require("passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || config.get("PORT");
const mongoUrl = config.get('mongoUri');

const app = express();
const server = require("http").Server(app);

app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}))
app.use(cors());
app.get("/",(req,res) => {
    res.redirect("/auth/login")
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

  app.use(passport.initialize());
  require("./server/middlewares/passport")(passport);

//AUTH
  require("./server/routes/auth/index.routes").configure(app);

  console.log("!!!!!!!!!!!");
  if(process.env.NODE_ENV === 'production'){

    app.use('/', express.static(path.join(__dirname,'public/browser')))
  
    app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'public/browser/index.html'));
    } )
    // require("./server/middlewares/socket.middleware").connect(server, true)
  }
  else{
    // require("./server/middlewares/socket.middleware").connect(server, false)
  }
 async function start(){
    try{
        mongoose.connect(mongoUrl, {});
        console.log("AAAAAAAAAAAA")
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