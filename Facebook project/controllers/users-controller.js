const db = require('../data/database');

const redirectToRoot = (req , res) => res.redirect('/');

const getProfile = async (req , res) => {
    
    if(!req.session.loggedInUser){
        res.redirect('/login');
        return;
    }
    
    // user here is the user that we're on his page so it can be anyone including the logged in user;
    const user = await db.getDB().collection('users').findOne({pageId:req.params.id});

    if(!user){
        return res.render('404')
    }

    let isAdmin = false;
    if (req.session.loggedInUser.pageId === req.params.id){
        isAdmin = true
    }

    res.locals.pageId = req.session.loggedInUser.pageId;
    res.locals.user = user;

    let added;
    for(item of user.friendRequests){
        if (req.session.loggedInUser.pageId === item.pageId){
            added = true;
            break;
        }
    }

    const loggedInUser = await db.getDB().collection('users').findOne({pageId:req.session.loggedInUser.pageId});
    const friendRequests = loggedInUser.friendRequests;
    res.locals.friendRequestsCount = friendRequests.length;

    let wantsToBeFriends;
    for (item of loggedInUser.friendRequests){
        if (item.pageId === user.pageId){
            wantsToBeFriends = true;
            break;
        }
    }
    
    let alreadyFriends;
    for (item of loggedInUser.friends){
        if (item.pageId === user.pageId){
            alreadyFriends = true;
            break;
        }
    }

    const currPage = 'profile';

    let pfp = user.profilePicturePath;
    if (!pfp){
        pfp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU'
    }
  
    const intro = user.intro;

    return res.render('profile',{user, isAdmin,added,friendRequests,wantsToBeFriends,alreadyFriends,loggedInUser,currPage, pfp, intro});
}

const addFriend = async(req , res) => {

    const user = await db.getDB().collection('users').findOne({pageId:req.session.loggedInUser.pageId});

    const requestReciever = await db.getDB().collection('users').findOne({pageId:req.params.id});

    const requests = requestReciever.friendRequests;

    let err = false;
    for(fr of requests){
        if(fr.name === user.name){
            err = true
            break;
        }
    }
    if(!err){
        requests.push({
            name : user.name,
            date: new Date().toLocaleDateString(),
            pageId : user.pageId,
            pfp : user.profilePicturePath
        })
    }

    
    await db.getDB().collection('users').updateOne({_id:requestReciever._id},{
        $set:{'friendRequests':requests}
    })



    return res.redirect('/users/' + req.params.id);

}

const removeFriend = async (req,res) => {
    const userId = req.session.loggedInUser.pageId;
    const loggedInUser = await db.getDB().collection('users').findOne({pageId:userId});
    const user = await db.getDB().collection('users').findOne({pageId: req.params.id});

    const target = loggedInUser.friends.find(friend => friend.pageId === req.params.id);


    loggedInUser.friends.splice(target , 1);

    const secondTarget = user.friends.find(friend => friend.pageId === userId);


    user.friends.splice(secondTarget , 1);

    // i could update both with one query later ..
    await db.getDB().collection('users').updateOne({pageId:userId},{$set:{"friends" : loggedInUser.friends}})

    await db.getDB().collection('users').updateOne({pageId:req.params.id},{$set:{"friends":user.friends}});

    
    return res.redirect('/users/' + req.params.id)
}

const acceptFriend = async (req , res) => {
    const userId = req.session.loggedInUser.pageId;
    const user = await db.getDB().collection('users').findOne({pageId:userId});


    const target = user.friendRequests.find(friendReq => friendReq.pageId === req.params.id)
    target.date = new Date().toLocaleDateString();


    user.friendRequests.splice(target,1);

    user.friends.push(target)


    await db.getDB().collection('users').updateOne({pageId:userId},{$set:{"friendRequests":user.friendRequests,"friends" : user.friends}});

    const userWhoRequested =  await db.getDB().collection('users').findOne({pageId:req.params.id})

    userWhoRequested.friends.push({
        name : user.name,
        date : new Date().toLocaleDateString(),
        pageId: userId
    })

    await db.getDB().collection('users').updateOne({pageId:req.params.id},{$set:{"friends": userWhoRequested.friends}});

    return res.redirect('/users/' + req.params.id)

}

const cancelRequest = async (req , res) => {
    const targetUser = await db.getDB().collection('users').findOne({pageId:req.params.id});

    const requests = targetUser.friendRequests;
    for(item of requests){
        if (item.pageId === req.session.loggedInUser.pageId){
            requests.splice(item, 1);
            break;
        }
    }

    await db.getDB().collection('users').updateOne({_id:targetUser._id},{
        $set:{"friendRequests" : requests}
    })

    return res.redirect('/users/'+ req.params.id);

}

const uploadImage = async (req , res) => {
    const userId = req.session.loggedInUser.pageId
    await db.getDB().collection('users').updateOne({pageId:userId},{$set:{"profilePicturePath" : req.file.path}});
    res.redirect('/users/' + userId);
}

const delPfp = async (req , res) => {
    await db.getDB().collection('users').updateOne({pageId:req.session.loggedInUser.pageId},{$set:{"profilePicturePath" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU"}});
    res.redirect('/users/' + req.session.loggedInUser.pageId);
}

const updateBio = async (req , res) => {
    const bio = req.body.bio;
    const loggedInUserId = req.session.loggedInUser.pageId
    await db.getDB().collection('users').updateOne({pageId:loggedInUserId},{$set:{'intro.bio':bio}}); 
    return res.redirect('/users/' + loggedInUserId);
}


module.exports = {
    redirectToRoot,
    getProfile,
    addFriend,
    removeFriend,
    acceptFriend,
    cancelRequest,
    uploadImage,
    delPfp,
    updateBio
}


// [
//     {firstuser:'me' , secondUser:'him/her', messages:[] },
//     {firstuser:'me' , secondUser:'him/her', messages:[] }
// ]

