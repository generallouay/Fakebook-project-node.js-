const sessionValidator = require('../utilities/session-validator');
const accManagement = require('../models/account-management');
const bcrypt = require('bcryptjs');
const db = require('../data/database');
const passwordValidator = require('../utilities/password-validatior')

const getSignup = (req , res) => {
    if (req.session.isAuth){
        return res.redirect('/home')
    }

    const sessionErr = sessionValidator.getSessionError(req)
    return res.render('register', {sessionErr});
}

const createUser = async (req , res) =>{
    const data = req.body;
    const {name , email , password} = data
    const confirmPassword = data['confirm-password'];
    const existingUser = await db.getDB().collection('users').findOne({email});

    if (existingUser){
        sessionValidator.sendSessionError(req,name,email,'User Already exists!')   
        res.redirect('/register')
        return;

    }
    if (password !== confirmPassword){
        sessionValidator.sendSessionError(req,name,email,'Passwords did not match!')
        res.redirect('/register')
        return;
    }
    const testPass = passwordValidator(password);
    if (!testPass[0]){
        sessionValidator.sendSessionError(req,name,email,testPass[1]);
        res.redirect('/register')
        return;
    }

    const hashedPassword = await bcrypt.hash(password , 12)
    const acc =  new accManagement.Account(name,email,hashedPassword);
    await db.getDB().collection('users').insertOne(acc);

    return res.redirect('/login');
}

const getLogin = async (req, res) => {
    if (req.session.isAuth){
        return res.redirect('/home')
    }
    const sessionErr = sessionValidator.getSessionError(req);
    return res.render('login',{sessionErr})

}

const logTheUserIn = async (req , res) => {
    const data = req.body;
    const {email, password, rememberme} = data
    const user = await db.getDB().collection('users').findOne({email});
    if(!user){
        sessionValidator.sendSessionError(req,null,email,"Invalid Email address")
        return res.redirect('/login')
    }

    const correctPass = await bcrypt.compare(password,user.password);

    if(!correctPass){
        sessionValidator.sendSessionError(req,null,email,"Incorrect password!")
        return res.redirect('/login')
    }
    

    sessionValidator.saveUserToSession(req,user,()=>{
       return res.redirect('/home');
    });;
 
}

const logTheUserOut = (req, res) => {
    req.session.isAuth = false;
    req.session.loggedInUser = null;
    return res.redirect('/');
}

module.exports = {
    getSignup,
    createUser,
    getLogin,
    logTheUserIn,
    logTheUserOut
}