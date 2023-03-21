import * as Actions from './action-types';
const INITIAL_STATE = {
  user_info: {
    first_name: 'Irfan',
    last_name: 'khan',
    email: 'irfan@gmail.com',
    image: null,
    role: 2,
  },
  current_location: {latitude: 0.73232, longitude: -0.323334},
  cards: [],
  rewards: [],
  claim_rewards: [],
  transactions: [],
  stores: [],
  store_data: {},
  wallet: {},
  headers: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };
    case Actions.SET_CURRENT_LOCATION:
      return {
        ...state,
        current_location: action.payload,
      };
    case Actions.SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case Actions.SET_REWARDS:
      return {
        ...state,
        rewards: action.payload,
      };
    case Actions.SET_CLAIM_REWARDS:
      return {
        ...state,
        claim_rewards: action.payload,
      };
    case Actions.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case Actions.SET_STORES:
      return {
        ...state,
        stores: action.payload,
      };
    case Actions.SET_STORE_DATA:
      return {
        ...state,
        store_data: action.payload,
      };
    case Actions.SET_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    case Actions.SET_HEADERS:
      return {
        ...state,
        headers: action.payload,
      };
    default:
      return state;
  }
};
