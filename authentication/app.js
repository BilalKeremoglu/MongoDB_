var express = require('express');
app = express();
bodyParser = require('body-parser');
mongoose = require('mongoose');
User = require('./models/user');
LocalStrategy = require('passport-local');
passport = require('passport');
passportLocalMongoose = require('passport-local-mongoose');

//database connection
mongoose.connect("mongodb://localhost/authentication");

app.use(bodyParser.urlencoded({ extend: true }));
app.set('view engine', 'ejs');

//çatı oluşturma
app.use(require("express-session")({
    secret: "Bu bir session express ugulamasıdır.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//encode decode etme
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/kaydol', (req, res) => {
    res.render('kaydol');
});

app.post('/kaydol', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("/home");
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/giris');
            });
        }
    });
});

app.get('/giris', (req, res) => {
    res.render('giris');
});

app.post('/giris', passport.authenticate('local', {
    successRedirect: "/gizli",
    failureRedirect: "/giris"
}), (req, res) => {

});

app.get('/cikis', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/giris');
    }
}

app.get('/gizli', isLoggedIn , (req, res) => {
    res.render('gizli');
});


//=========================================================\\
var server = app.listen(3000, () => {
    console.log("Sunucu portu: %d", server.address().port);
});