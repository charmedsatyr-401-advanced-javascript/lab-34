const models = ['teams', 'players'];

let model = models[0];
let API_SERVER_URL = `https://api-js401.herokuapp.com/api/v1/${model}/schema`;

// model = models[1];
API_SERVER_URL = `https://api-js401.herokuapp.com/api/v1/${model}/schema`;

export default API_SERVER_URL;
