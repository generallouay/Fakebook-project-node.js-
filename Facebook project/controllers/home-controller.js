const db = require('../data/database');
const postManagement = require('../models/post-management');
  
const redirectHome = (req, res) => {
    if (req.session.isAuth){
        return res.redirect('home')
    }else{
        return res.redirect('login');
    }
}

const getHome = async (req , res) => {
    if (req.session.isAuth){

        const loggedInUserId = req.session.loggedInUser.pageId
        res.locals.pageId = loggedInUserId;
        const user = await db.getDB().collection('users').findOne({pageId : loggedInUserId});

        const friendRequests = user.friendRequests;

        res.locals.friendRequestsCount = friendRequests.length;

        const friends = user.friends;
        const allUsers = await db.getDB().collection('users').find().toArray();


        const loggedInUserPosts = user.posts;

        const friendsPosts = [];

        for(let friend of friends){
            const friendId = friend.pageId;
            const user = await db.getDB().collection('users').findOne({pageId:friendId});
            const friendPosts = user.posts
            for(post of friendPosts){   
                friendsPosts.push(post);
            }
        }

        const feed = loggedInUserPosts.concat(friendsPosts);
        const shuffledFeed = postManagement.shuffle(feed)
    

        let isAdmin = false;

        const currPage = 'home';

        const defaultPfp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU';
        let loggedInPfp = user.profilePicturePath;
        if (!loggedInPfp){
            loggedInPfp = defaultPfp;
        }
        
        for(let p of shuffledFeed){
            const user = await db.getDB().collection('users').findOne({pageId:p.author.pageId});
            p.author.pfpfix = user.profilePicturePath;
        }

        for(let i of friends){
            const user = await db.getDB().collection('users').findOne({pageId:i.pageId});
            i.pfpfix = user.profilePicturePath;
        }


        res.render('home', {friendRequests, friends , allUsers , loggedInUser:user,shuffledFeed,currPage,isAdmin,loggedInPfp,defaultPfp});

    }else{
        res.redirect('login');
    }
}

module.exports = {
    redirectHome,
    getHome
}