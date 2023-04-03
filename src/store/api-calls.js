import * as Actions from './action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SERVICES from '../services/common-services';
import API_REQUESTS from './api-requests';
import {URLS} from './api-urls';
import alertService from '../services/alert.service';

const get_current_location = params => {
  return async (dispatch, getState) => {
    try {
      const res = await SERVICES._get_current_location();
      var location = {
        address: 'Lahore,pakistan',
        latitude: res?.coords?.latitude,
        longitude: res?.coords?.longitude,
      };
      const json = await SERVICES._get_address(
        location.latitude,
        location.longitude,
      );
      location.address = json.results[3].formatted_address;
      dispatch({
        type: Actions.SET_CURRENT_LOCATION,
        payload: location,
      });
      return location;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const register = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.auth.register,
        payload,
      );
      console.log('Registration Response');
      return response;
    } catch (error) {
      return error;
    }
  };
};
const update = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.putFormData(
        URLS.auth.update,
        payload,
      );
      console.log(response?.data?.data);
      await AsyncStorage.setItem('@user', JSON.stringify(response?.data?.data));
      dispatch({
        type: Actions.SET_USER_INFO,
        payload: response?.data?.data,
      });
      alertService.show(response?.data?.message, 'Account');
    } catch (error) {
      return error;
    }
  };
};
const signin = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.auth.authenticate,
        payload,
      );
      if (response?.data?.api_status === true) {
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify(response?.data?.user),
        );
        dispatch({
          type: Actions.SET_USER_INFO,
          payload: response?.data?.user,
        });
        if (response?.headers) {
          dispatch({
            type: Actions.SET_HEADERS,
            payload: response?.headers,
          });
          await AsyncStorage.setItem(
            '@headers',
            JSON.stringify(response?.headers),
          );
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};
const reset_password = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.auth.reset_password,
        payload,
      );
      console.log(response?.data);
      if (response?.data?.succeeded === true) {
        alertService.show(response?.data?.message, 'New Password');
      }
      return response;
    } catch (error) {
      console.log(error?.response?.data);
      if (error?.response?.data?.Message) {
        alertService.show(error?.response?.data?.Message, 'Account');
      }
      if (error?.response?.data?.errors) {
        var errors = error?.response?.data?.errors;
        if (errors?.Password) {
          alertService.show(errors?.Password[0], 'Account');
        }
      }
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const forgot_password = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postFormData(
        URLS.auth.forgot_password,
        payload,
      );

      return response;
    } catch (error) {
      return error;
    }
  };
};
const get_cards = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.cards.get_cards);
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_CARDS,
          payload: response?.data?.cards,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const buy_card = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.cards.buy_card,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const claim_card = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.cards.claim_card + id,
        {},
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const fetch_rewards = user_id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.cards.fetch_rewards + user_id,
      );
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_REWARDS,
          payload: response?.data?.latest_rewards,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const fetch_claim_rewards = user_id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.cards.fetch_claim_rewards + user_id,
      );
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_CLAIM_REWARDS,
          payload: response?.data?.claim_rewards,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const fetch_transactions = user_id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.cards.fetch_transactions + user_id,
      );
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_TRANSACTIONS,
          payload: response?.data?.transactions,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const fetch_wallet = user_id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.cards.fetch_balance + user_id,
      );
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_WALLET,
          payload: response?.data,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const contact_us = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.store.contact_use,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const fetch_store = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.store.fetch_store + id);
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_STORE_DATA,
          payload: response?.data?.stores,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const fetch_stores = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.store.fetch_stores);
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_STORES,
          payload: response?.data?.stores,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const pay_at_store = (payload, store_id, user_id) => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.store.pay_at_store +
          'store_id=' +
          store_id +
          '&user_id=' +
          user_id,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const create_withdraw = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.store.create_withdraw,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const fetch_users = q => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.auth.fetch_users + q);
      if (response?.data?.api_status === true) {
        dispatch({
          type: Actions.SET_USERS,
          payload: response?.data?.users_list,
        });
      }
    } catch (error) {
      return error;
    }
  };
};
const DIVIY_API = {
  get_current_location,
  signin,
  reset_password,
  forgot_password,
  register,
  update,
  get_cards,
  buy_card,
  claim_card,
  fetch_rewards,
  fetch_claim_rewards,
  fetch_transactions,
  contact_us,
  fetch_stores,
  fetch_store,
  pay_at_store,
  fetch_wallet,
  create_withdraw,
  fetch_users,
};

export default DIVIY_API;
