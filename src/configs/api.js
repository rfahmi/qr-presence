import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://qrpresence-api.herokuapp.com',
  headers: {
    Accept: 'application/json',
  },
  timeout: 5000,
});
