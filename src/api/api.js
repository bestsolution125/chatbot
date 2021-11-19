import _axios from "axios";
export const API_BASE = "https://mocki.io/v1";

export const axios = _axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
});

export default () => {
  return {
    project: {
      getMessages: (params) => axios.get("/c730e4c3-d65f-45fc-8e1f-06eb8346e110", params),
    }
  };
};
