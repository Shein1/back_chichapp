import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

// Initialize LocalStrategy process

passport.use(
  new LocalStrategy(
    {
      usernameField: 'nickname',
      passwordField: 'password'
    },
    async (nickname, password, done) => {
      try {
        let user = await User.findOne({ where: { nickname } });
        if (!user) {
          return done(`Can't find user ${nickname}`);
        }

        if (!await user.checkPassword(password)) {
          return done(`Please check your password`);
        }

        return done(false, user);
      } catch (err) {
        done('Something wrong happens');
      }
    }
  )
);

// Initialize JWTStrategy process

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENCRYPTION
    },
    async (jwtPayload, done) => {
      let user = await User.findOne({ where: { uuid: jwtPayload.uuid } });
      if (!user) {
        return done(`User ${uuid} doesn't exist`);
      }

      done(false, user);
    }
  )
);
