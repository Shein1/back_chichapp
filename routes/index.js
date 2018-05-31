import { Router } from 'express';
import user from './user';
import hookah from './hookah';
import store from './store';
import auth from './auth';
import passport from 'passport';

let api = Router();

api.get('/', (req, res) => {
  res.json({ hi: 'startupWeek API' });
});

api.use('/users', passport.authenticate('jwt', { session: false }), user);
api.use('/hookahs', hookah);
api.use('/stores', store);
api.use('/auth', auth);

export default api;
