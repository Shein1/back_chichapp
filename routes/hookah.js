import { Router } from 'express';
import Hookah from '../models/hookah';

let api = Router();

api.get('/', async (req, res) => {
  let hookahs = await Hookah.findAll();
  res.json({ hookahs });
});

api.get('/:id/', async (req, res) => {
  let hookah = await Hookah.findById(req.params.id);
  res.json({ hookah });
});

export default api;
