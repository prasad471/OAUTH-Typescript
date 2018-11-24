import express from 'express';
import expressSession from 'express-session';
import passport from "passport";
import GoogleOAUTH from 'passport-google-oauth';
import TwitterOAUTH from 'passport-twitter';
import config from './config';


const GoogleStrategy = GoogleOAUTH.OAuth2Strategy;
const TwitterStrategy = TwitterOAUTH.Strategy;
const app = express();
app.use(express.static('./Public'));
app.use(expressSession({ secret: 'keyboard cat'}));

app.use(passport.initialize());
app.use(passport.session());
// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret ,
    callbackURL: config.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
  }
  ));


  passport.use(new TwitterStrategy({

    consumerKey     : config.twitterAuth.consumerKey,
    consumerSecret  : config.twitterAuth.consumerSecret,
    callbackURL     : config.twitterAuth.callbackURL

},
function(token, tokenSecret, profile, done) {

  console.log(profile);
 return done(null, profile);


}
));



app.get('/', (req, res) => res.send('Hello World!'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/dashBoard');
  });
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {successRedirect : '/#/dashBoard', failureRedirect : '/#/login'}),
function(req, res) {
    console.log("test12345twitter");
    res.redirect('/');
  });

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/twitter', passport.authenticate('twitter'));


app.listen(2100, () => console.log('Example app listening on port 2100!'));
