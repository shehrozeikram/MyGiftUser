export const IP = 'http://164.92.78.170';
export const MapKey = 'asdwfe';
export const URLS = {
  base_url: `${IP}/api/v1/`,
  image_url: `${IP}/UploadedFiles/`,
  auth: {
    authenticate: 'users/sign_in.json?locale=en',
    register: 'users.json?locale=en',
    update: 'user?locale=en',
    reset_password: 'users/password.json?locale=en',
    forgot_password: 'users/password.json?locale=en',
  },
  cards: {
    get_cards: 'cards/fetch_cards?locale=en',
  },
};
