const BASE_URL = 'https://api-js401.herokuapp.com/api/v1';

const getUrl = (model, id) => ({
  schema: `${BASE_URL}/${model}/schema`,
  api: `${BASE_URL}/${model}`,
  get: `${BASE_URL}/${model}`,
  getOne: `${BASE_URL}/${model}/${id}`,
  post: `${BASE_URL}/${model}`,
  patch: `${BASE_URL}/${model}/${id}`,
  put: `${BASE_URL}/${model}/${id}`,
  delete: `${BASE_URL}/${model}/${id}`,
});

export default getUrl;
