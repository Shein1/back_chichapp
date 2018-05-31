import { db as database } from '../models';
import Hookah from '../models/hookah';
import axios from 'axios';
import { SETTINGS } from '../constants/index';
const API = SETTINGS.MAPS_API;

database
  .sync()
  .then(async () => {
    let baseURL = API.BASE_URL;
    let apiKey = API.API_KEY;
    let location = API.LOCATION;
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
              console.log(hookah_res.photos);
              let hookah = new Hookah({
                name: hookah_res.name,
                adress: hookah_res.formatted_address,
                rating: hookah_res.rating,
                schedule: hookah_res.opening_hours.weekday_text,
                ref_photo: hookah_res.photos[0].photo_reference
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
