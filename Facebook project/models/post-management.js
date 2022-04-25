function CreatePost(title , content , user){
    this.title = title;
    this.content = content;
    this.author = {
        _id: user._id,
        pageId : user.pageId,
        name : user.name,
    };
    this.likes = [];
    this.comments = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    this.date = new Date().toLocaleString('en-US', options);
    this.time = new Date().toLocaleTimeString();
    this.id = Date.now() + Math.round(Math.random() * 10000) + 'fb';
}

const ObjectId = require('mongodb').ObjectId
const db = require('../data/database')

async function editPost(req){

    const data = req.body;
    const {title , content} = data
    const postId = req.params.id;


    const userId = new ObjectId(data._id);


    const user = await db.getDB().collection('users').findOne({_id:userId})

    const userPosts = user.posts;

    const fixedArr = [];

    for(post of userPosts){
        if(post.id === postId){
            post.title = title;
            post.content = content;
        }
        fixedArr.push(post);
    }

    await db.getDB().collection('users').updateOne({_id:userId},{$set:{"posts": fixedArr}})

}

async function deletePost(req){
    const postId = req.params.id;


    const userId = new ObjectId(req.body._id);


    const user = await db.getDB().collection('users').findOne({_id:userId})

    const userPosts = user.posts;

    const fixedArr = [];

    for(post of userPosts){
        if(post.id === postId){
            continue;
        }
        fixedArr.push(post);
    }

    await db.getDB().collection('users').updateOne({_id:userId},{$set:{"posts": fixedArr}})

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
  

module.exports = {
    CreatePost,
    editPost,
    deletePost,
    shuffle
}