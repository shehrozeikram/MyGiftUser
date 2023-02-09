import SERVICES from '../services/common-services';

const postData = async (url, data) => {
  const response = await client.post(url, data);
  return response;
};
const putData = async (url, data) => {
  const response = await client.put(url, data);
  return response;
};
const postFormData = async (url, data) => {
  data = SERVICES.getFormData(data);
  const response = await clientFormData.post(url, data);
  return response;
};
const putFormData = async (url, data) => {
  data = SERVICES.getFormData(data);
  const response = await clientFormData.put(url, data);
  return response;
};
const getData = async url => {
  console.log('url: ', url);
  const response = await client.get(url);
  return response;
};
const deleteData = async url => {
  console.log('url: ', url);
  const response = await client.delete(url);
  return response;
};
const API_REQUESTS = {
  postData,
  postFormData,
  getData,
  putFormData,
  putData,
  deleteData
};

export default API_REQUESTS;
