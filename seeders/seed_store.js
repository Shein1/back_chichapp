import { db as database } from '../models';
import Store from '../models/store';
import axios from 'axios';
import { SETTINGS } from '../constants/index';
const API = SETTINGS.MAPS_API;

database
  .sync()
  .then(async () => {
    let baseURL = API.BASE_URL;
    let apiKey = API.API_KEY;
    let location = API.LOCATION;
    let query = 'magasin+chicha+paris';

    axios
      .get(
        `${baseURL}textsearch/json?query=${query}&radius=10000&key=${apiKey}`
      )
      .then(response => {
        const res = response.data.results;
        console.log(res);
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
                rating: store_res.rating
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
