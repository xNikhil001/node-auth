const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: 'cp0099',
  collection: 'session',
  expires: 1000 * 60 * 60 * 24,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  }
},(err)=>{
  if(err) console.log(err);
  console.log("connected to MongoStore");
})

const sess = {
  key: "userInfo",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  },
  store: store
}

module.exports = sess;