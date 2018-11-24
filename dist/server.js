"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = __importDefault(require("passport-google-oauth"));
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const config_1 = __importDefault(require("./config"));
const GoogleStrategy = passport_google_oauth_1.default.OAuth2Strategy;
const TwitterStrategy = passport_twitter_1.default.Strategy;
const app = express_1.default();
app.use(express_1.default.static('./Public'));
app.use(express_session_1.default({ secret: 'keyboard cat' }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Passport session setup.
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport_1.default.use(new GoogleStrategy({
    clientID: config_1.default.googleAuth.clientID,
    clientSecret: config_1.default.googleAuth.clientSecret,
    callbackURL: config_1.default.googleAuth.callbackURL
}, function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
}));
passport_1.default.use(new TwitterStrategy({
    consumerKey: config_1.default.twitterAuth.consumerKey,
    consumerSecret: config_1.default.twitterAuth.consumerSecret,
    callbackURL: config_1.default.twitterAuth.callbackURL
}, function (token, tokenSecret, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/dashBoard');
});
app.get('/auth/twitter/callback', passport_1.default.authenticate('twitter', { successRedirect: '/#/dashBoard', failureRedirect: '/#/login' }), function (req, res) {
    console.log("test12345twitter");
    res.redirect('/');
});
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/twitter', passport_1.default.authenticate('twitter'));
app.listen(2100, () => console.log('Example app listening on port 2100!'));
//# sourceMappingURL=server.js.map