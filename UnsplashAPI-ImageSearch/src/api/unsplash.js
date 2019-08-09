import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      'Client-ID 0736ba3ed7802ae4e9257b644782f43ca5d66e44650955ee10782405f93b91fd'
  }
});
