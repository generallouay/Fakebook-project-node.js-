
function getSessionError(req){
    let sessionErr = req.session.inputErrors;
    if (!sessionErr){
        sessionErr = {
            err:false,
            name : '',
            email:'',
            msg: '',
        }
    }
    req.session.inputErrors = null;
    return sessionErr
}
function sendSessionError(req,name,email,msg){

    req.session.inputErrors = {
        err : true,
        name,
        email,
        msg,
    }

    req.session.save();
}

function saveUserToSession(req,user,cb){
    req.session.loggedInUser = {id : user._id, email:user.email, pageId : user.pageId};
    req.session.isAuth = true;
    req.session.save()
    cb();

}

module.exports = {
    getSessionError,
    sendSessionError,
    saveUserToSession
}