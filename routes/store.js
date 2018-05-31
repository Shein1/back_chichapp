import { Router } from 'express';
import Store from '../models/store';

let api = Router();

api.get('/', async (req, res) => {
	let stores = await Store.findAll();
	res.json({ stores });
});

api.get('/:id/', (req, res) => {
	let store = Store.findOne(req.params.id);
	res.json({ store });
});

export default api;
