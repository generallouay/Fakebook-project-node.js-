const express = require('express');
const path = require('path')
const app = express()
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const usersRoutes = require('./routes/users');
const homeRoute = require('./routes/home');
const errorRoutes = require('./routes/errors');
const db = require('./data/database');
const session = require('express-session');
const sessionConfig = require('./configurations/session');


app.set('view engine', 'ejs')

app.set('views' , path.join(__dirname,'views'));

app.use(session(sessionConfig()));

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.use("/users/profile-pictures",express.static('profile-pictures'));

app.use("/profile-pictures",express.static('profile-pictures'));

app.use(authRoutes);

app.use(homeRoute);

app.use(usersRoutes)

app.use(postRoutes);

app.use(errorRoutes);


// app.use((error, req, res, next) => res.render('500'))
const PORT = 5000;

db.connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on port", PORT);
    })
})

