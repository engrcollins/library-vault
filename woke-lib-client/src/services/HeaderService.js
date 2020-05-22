import http from "../http-common";

const get = () => {
  return http.get("/logout");
};

export default{
    get
};
