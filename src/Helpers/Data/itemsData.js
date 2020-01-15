import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getItemsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allItemsObj = result.data;
      const items = [];
      if (allItemsObj != null) {
        Object.keys(allItemsObj).forEach((itemId) => {
          const newItem = allItemsObj[itemId];
          newItem.id = itemId;
          items.push(newItem);
        });
      }
      resolve(items);
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteAnItem = (itemId) => axios.delete(`${baseUrl}/items/${itemId}.json`);

const addAnItem = (newItem) => axios.post(`${baseUrl}/items.json`, newItem);

const getSingleItem = (itemId) => axios.get(`${baseUrl}/items/${itemId}.json`);

export default {
  getItemsByUid,
  deleteAnItem,
  getSingleItem,
  addAnItem,
};
