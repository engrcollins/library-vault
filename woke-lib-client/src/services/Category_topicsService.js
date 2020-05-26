import http from "../http-common";

const get = category => {
    console.log(category)
  return http.get(`/library_topics/category/${category}`);
};

export default {
  get,
};
