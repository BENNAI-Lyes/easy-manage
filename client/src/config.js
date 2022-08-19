import axios from "axios";

export const axiosI = axios.create({
  baseURL: "https://easy--manage.herokuapp.com/api/v1/",
});
