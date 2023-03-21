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
    delete: 'users/sign_out.json?locale=en',
  },
  cards: {
    get_cards: 'cards/fetch_cards?locale=en',
    buy_card: 'cards/create_gift?locale=en',
    claim_card: 'cards/claim_reward/?reward_id=',
    fetch_rewards: 'cards/fetch_rewards?locale=en&user_id=',
    fetch_claim_rewards: 'cards/fetch_claim_rewards?locale=en&user_id=',
    fetch_transactions: 'cards/fetch_transactions?locale=en&user_id=',
    fetch_balance: 'cards/fetch_user_wallet?locale=en&user_id=',
  },
  store: {
    contact_use: 'stores/contact_us?locale=en',
    fetch_store: 'stores/fetch_stores?locale=en&store_id=',
    fetch_stores: 'stores/fetch_stores?locale=en',
    pay_at_store: 'stores/create_store_payment?locale=en&',
    create_withdraw: 'stores/create_withdraw?locale=en',
  },
};
