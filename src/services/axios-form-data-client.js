
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URLS } from '../store/api-urls';
import alertService from './alert.service';

const CancelToken = axios.CancelToken;
source = CancelToken.source();
clientFormData = axios.create({
  baseURL: URLS.base_url,
});

//Axios Interceptors
clientFormData.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token');
    config.headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
    };

    config.params = config.params || {};
    config.cancelToken = source.token || {};
    if (JSON.parse(token)) {
      config.headers['Authorization'] =
        `Bearer ` + JSON.parse(token)?.access_token;
    }
    return config;
  },
  error => {
    console.log('I am here');
    Promise.reject(error);
  },
);

clientFormData.interceptors.response.use(
  response => {
    console.log('RESPONSE INTERCPTOR : ', response?.status);
    return response;
  },
  async function (error) {
    console.log('INTERCEPTOR ERROR RESPONSE : ', error?.response?.data);
    console.log('INTERCEPTOR ERROR RESPONSE CONFIG: ', error?.config);
   if (error?.response?.status === 401) {
      console.log("Un-Authorized")
      await AsyncStorage.clear();
      alertService.confirm("Session Expired! Please Login","Log in").then(res=>{
        dnavigation.replace("Signin")
      }).catch(err=>{
        console.log(err)
      });
    }
    return Promise.reject(error);
  },
);
