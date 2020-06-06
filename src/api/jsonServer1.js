import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
    baseURL: 'http://192.168.1.12:8085',
    // baseURL: 'http://67edec48.ngrok.io',
    // baseURL: 'https://git.heroku.com/accident-blood-donate.git',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // config.cookies.token = token;
        //   {
        headers: Authorization: `Bearer ${token}`;

        //   }},
        // config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
export default instance;
