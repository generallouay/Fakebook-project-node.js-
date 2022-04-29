const db = require('../data/database');
const postManagement = require('../models/post-management');
const ObjectId = require('mongodb').ObjectId;

const createPost = async(req , res) => {

    const data = req.body;
    const {title,content,_id} = data

    const userId = new ObjectId(_id);
    const user = await db.getDB().collection('users').findOne({_id:userId})

    const post = new postManagement.CreatePost(title,content,user);

    const postsArr = user.posts;
    postsArr.push(post)
    await db.getDB().collection('users').updateOne({_id:userId},{$set:{"posts":postsArr}});
    
    if(data.currPage === 'home'){
        return res.redirect('/home')
    }
    return res.redirect(`/users/${user.pageId}`);
}

const editPost = async (req , res) => {
    postManagement.editPost(req)
    return res.redirect(`/users/${req.session.loggedInUser.pageId}`);     
}

const deletePost = async (req , res) => { 
    postManagement.deletePost(req)
    return res.redirect(`/users/${req.session.loggedInUser.pageId}`);    
}

const likePost = async (req,res)=>{
    const data = req.body;
    const {postId, userid:pageId , likeorcancel} = data


    //userid here is publisher

    const postAuther = await db.getDB().collection('users').findOne({pageId});

    const target = postAuther.posts.find(post => post.id === postId);
    const currentLikes = target.likes; //an array

    const loggedInUser = await db.getDB().collection('users').findOne({pageId:req.session.loggedInUser.pageId});

    let fixedLikes = [...currentLikes];

    if (likeorcancel === "like"){
        let alreadyLiked;
        for(like of fixedLikes){
            if (like.pageId === loggedInUser.pageId){
                alreadyLiked = true;
                break;
            }          
        }
        if (!alreadyLiked){
            fixedLikes.push({
                name : loggedInUser.name,
                pageId : loggedInUser.pageId
            })
        }
       
    }else if (likeorcancel === "cancel"){
        fixedLikes = currentLikes.filter(el => el.pageId !== loggedInUser.pageId)
        
    }

           
    await db.getDB().collection('users').updateOne({pageId,"posts.id":postId},{$set:{
        "posts.$.likes" : fixedLikes
    }})

    return res.status(204).send()
}

module.exports = {
    createPost,
    editPost,
    deletePost,
    likePost
}