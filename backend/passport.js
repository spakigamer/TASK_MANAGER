import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { User, Task } from './databasess.js';

passport.use("local", new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const original_password = user.password;
      const salt = user.salt;
      
      // Use async version of pbkdf2
      crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          return done(err);
        }
        console
        if (derivedKey.toString('hex') != original_password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return cb(new Error('User not found'));
    }
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

export default passport;
