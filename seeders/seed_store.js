import { db as database } from '../models';
import Store from '../models/store';
import axios from 'axios';
import { SETTINGS } from '../constants/index';

import dotenv from 'dotenv';
dotenv.config();

database
  .sync()
  .then(async () => {
    let baseURL = process.env.BASE_URL;
    let apiKey = process.env.API_KEY;
    let query = 'magasin+chicha+paris';

    axios
      .get(
        `${baseURL}textsearch/json?query=${query}&radius=10000&key=${apiKey}`
      )
      .then(response => {
        const res = response.data.results;
        for (var i = 0; i < res.length; i++) {
          axios
            .get(
              `${baseURL}details/json?placeid=${res[i].place_id}&key=${apiKey}`
            )
            .then(async response => {
              const store_res = response.data.result;
              let store = new Store({
                name: store_res.name,
                adress: store_res.formatted_address,
                rating: store_res.rating,
                schedule: store_res.opening_hours.weekday_text,
                ref_photo: store_res.photos[0].photo_reference,
                latitude: store_res.geometry.location.lat,
                longitude: store_res.geometry.location.lng
              });
              await store.save();
            });
        }
      });
  })

  .catch(err => {
    console.error(`Unable to connect to SQL database: ${err}`.red);
    process.exit(42);
  });
