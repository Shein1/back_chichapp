import { Router } from 'express';
import User from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

let api = Router();

api.get('/', async (req, res) => {
  let users = await User.findAll();
  res.json({ users });
});

api.post('/register', async (req, res) => {
  const { nickname, email, password, password_confirmation } = req.body;

  try {
    let user = new User({
      nickname,
      email,
      password,
      password_confirmation
    });

    await user.save();

    res.status(201).json({ status: 201, data: { user } });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

/** About Login
 */
api.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }

    const { id, nickname, email } = user.toJSON();

    let token = jwt.sign({ id, nickname, email }, process.env.JWT_ENCRYPTION);

    res.json({ token, data: { user } });
  })(req, res);
});

export default api;
