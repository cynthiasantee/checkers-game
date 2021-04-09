import passport from "passport"
import passportLocal from 'passport-local'
import { playerService } from "./service/playerService.js";
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      playerService.getPlayerByEmail(username)
        .then(user => {
          // console.log(user);
          if (user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        })
        .catch(err => {
          return done(err);
        })
    }
  ));
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

export default passport;