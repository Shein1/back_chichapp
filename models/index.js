import Sequelize, { Op } from 'sequelize';

import User from './user';
// import Review from './review';
import Hookah from './hookah';
import Store from './store';

import dotenv from 'dotenv';
dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  operatorsAliases: Op,
  define: {
    underscored: true
  }
});

// models initialization
User.init(db, Sequelize);
// Review.init(db, Sequelize);
Hookah.init(db, Sequelize);
Store.init(db, Sequelize);
