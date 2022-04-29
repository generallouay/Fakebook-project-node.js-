const mongoClient = require('mongodb').MongoClient;

let database;

async function connectToDB(){
    const clinet = await mongoClient.connect('mongodb://0.0.0.0:27017')
    database = clinet.db('fakebook');
}
function getDB(){
    if (!database){
        throw { message : "invalid connection"}
    }
    return database;

}


module.exports = {
    getDB,
    connectToDB
}