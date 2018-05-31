import { Router } from 'express';
import Hookah from '../models/hookah';

let api = Router();

// Get Hokkah bar list

api.get('/', async (req, res) => {
  let hookahs = await Hookah.findAll();
  res.json({ hookahs });
});

// Get information of specific hookah bar

api.get('/:id/', async (req, res) => {
  let hookah = await Hookah.findById(req.params.id);
  res.json({ hookah });
});

export default api;
