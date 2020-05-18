import http from "../http-common";

const create = data => {
  return http.post("/login", data);
};
export default {
  create
};
