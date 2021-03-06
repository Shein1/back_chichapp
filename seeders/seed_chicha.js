import { db as database } from '../models';
import Hookah from '../models/hookah';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

database
  .sync()
  .then(async () => {
    let baseURL = process.env.BASE_URL;
    let apiKey = process.env.API_KEY;
    let query = 'chicha+in+paris';

    axios
      .get(`${baseURL}textsearch/json?query=${query}&key=${apiKey}`)
      .then(response => {
        const res = response.data.results;

        for (var i = 0; i < res.length; i++) {
          axios
            .get(
              `${baseURL}details/json?placeid=${res[i].place_id}&key=${apiKey}`
            )
            .then(async response => {
              const hookah_res = response.data.result;
              let hookah = new Hookah({
                name: hookah_res.name,
                adress: hookah_res.formatted_address,
                rating: hookah_res.rating,
                schedule: hookah_res.opening_hours.weekday_text,
                ref_photo: hookah_res.photos[0].photo_reference,
                latitude: hookah_res.geometry.location.lat,
                longitude: hookah_res.geometry.location.lng
              });
              await hookah.save();
            });
        }
      });
  })

  .catch(err => {
    console.error(`Unable to connect to SQL database: ${err}`.red);
    process.exit(42);
  });
