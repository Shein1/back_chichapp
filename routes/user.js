import { Router } from 'express';
import User from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

let api = Router();

api.get('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    const { uuid, nickname, email } = user.toJSON();

    if (user) {
      res.json({ data: { uuid, nickname, email } });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

export default api;
