import passport from "passport"
import passportLocal from 'passport-local'
import { playerService } from "./service/playerService.js";
const LocalStrategy = passportLocal.Strategy;
import bcrypt from "bcrypt";

passport.use(new LocalStrategy(
     function(username, password, done) {
      playerService.getPlayerByEmail(username)
        .then(user => {
          const isPasswordValid = bcrypt.compareSync(password, user.password)
          if (isPasswordValid) {
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