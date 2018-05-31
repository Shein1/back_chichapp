import { Router } from 'express';
import Store from '../models/store';

let api = Router();

// Get Stores list

api.get('/', async (req, res) => {
  let stores = await Store.findAll();
  res.json({ stores });
});

// Get information of specific store

api.get('/:id/', async (req, res) => {
  let store = await Store.findById(req.params.id);
  res.json({ store });
});

export default api;
