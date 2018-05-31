import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';

import 'colors';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './models';
import routes from './routes';

import './middleware/passport';

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

db.sync().then(() => {
  app.use('/api', routes);

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err.red);
      process.exit(1);
    }

    console.log(`Server is running at port ${process.env.PORT}`.cyan);
  });
});
