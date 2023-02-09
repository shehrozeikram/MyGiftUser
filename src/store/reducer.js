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
    default:
      return state;
  }
};
