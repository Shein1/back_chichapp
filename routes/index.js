import { Router } from 'express';
import user from './user';
import hookah from './hookah';
import store from './store';

let api = Router();

api.get('/', (req, res) => {
	console.log('Hello BOIIIIII');
	res.json({ hi: 'startupWeek API' });
});

api.use('/users', user);
api.use('/hookahs', hookah);
api.use('/stores', store);

export default api;
