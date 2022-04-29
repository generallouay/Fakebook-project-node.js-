const session = require('express-session');
const connectMongoSession = require('connect-mongodb-session');


function createSessionStore(){

  const MongoDBStore = connectMongoSession(session);


  const sessionStore = new MongoDBStore({
  uri: 'mongodb://0.0.0.0:27017',
  databaseName: 'fakebook',
  collection: 'sessions'
  });
  return sessionStore

}

function sessionConfig(){
  return {
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  store: createSessionStore(),
  cookie: {
  maxAge: 2 * 24 * 60 * 60 * 1000
  }
  }
}




module.exports = sessionConfig