import Axios from "axios";

Axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const axios = Axios.create();

export default axios;
