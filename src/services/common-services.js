import { Platform, Share, } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service'
import { requestLocationPermission } from "./request_location_permission";
import { IP, URLS } from "../store/api-urls";
import { MapKey } from "../store/api-urls";
import Geocoder from 'react-native-geocoding';
// Initialize the module (needs to be done only once)
Geocoder.init(MapKey);
const createShareLink = refId => {
  let shareLink = '';
  try {
    shareLink = `${IP}/${refId}`;
  } catch (err) {}
  return shareLink;
};


const SERVICES = {
  getFormData: (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },
  _returnError: error => {
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log(_response);
      return JSON.parse(_response)?.message
        ? JSON.parse(_response)?.message.toString()
        : error.message?.toString();
    } else {
      if (error === 'Hi Dude') {
        return 'Dismiss';
      } else if (error?.message) {
        if (error?.message === 'Network Error') {
          return 'Network Error';
        } else {
          return error?.message?.toString();
        }
      } else {
        return error?.toString();
      }
    }
  },
  _capitalizeFirst:(str)=>(str.charAt(0).toUpperCase() + str.slice(1)),
  _returnStringify: (data) => JSON.stringify(data),
  
  _share:async (description = '',url) => {
    try {
      console.log('url::',url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  _get_current_location :async() => {
    try {
      await requestLocationPermission()
      return new Promise((res, rej) => {
        Geolocation.getCurrentPosition(res, rej);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  _get_address :async(lat,lng) => {
    try {
      return await Geocoder.from(lat,lng);
    } catch (error) {
      throw new Error(error);
    }
  },
  _get_distance:(lattitude1,longitude1,lattitude2,longitude2)=>{
    const toRadian = n => (n * Math.PI) / 180
      let lat2 = lattitude2
      let lon2 = longitude2
      let lat1 = lattitude1
      let lon1 = longitude1
      let R = 6371 // km
      let x1 = lat2 - lat1
      let dLat = toRadian(x1)
      let x2 = lon2 - lon1
      let dLon = toRadian(x2)
      let a =Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = R * c
      return d.toFixed(2)
  },
  serialize: (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
  _removeEmptyKeys: (payload) => {
    const obj = payload;
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
        delete obj[key];
      }
    });
    return obj;
  },
  _returnFile: (uri) => `${URLS.image_url}${uri}`,
  _returnImageCamera: async () => {
    try {
      const res = await launchCamera({ mediaType: 'photo', includeBase64: false });
      if (res?.didCancel) {
        throw 'user canceled the action';
      }
      else if (res?.assets) {
        return {
          uri: Platform.OS === "android" ? res.assets[0].uri : res.assets[0].uri.replace("file://", ""),
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        }
      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }

  },
  _returnImageGallery: async () => {
    try {
      const res = await launchImageLibrary({ mediaType: 'photo', includeBase64: false });
      if (res?.didCancel) {
        // throw 'user canceled the action';
        console.log('user canceled the action');
      }
      else if (res?.assets) {
        return {
          uri: Platform.OS === "android" ? res?.assets[0].uri : res?.assets[0].uri.replace("file://", ""),
          name: res?.assets[0].fileName,
          type: res?.assets[0].type,
        }
      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  findOnlineUser:(users={},user_id)=>{
    console.log('usersssss:::',users);
   return Object.keys(users)?.find((key, index)=>
   users[key]?.user_id===user_id
    );
  }
};

export default SERVICES;
