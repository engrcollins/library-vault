import http from "../http-common";

const get = username => {
    console.log(username)
  return http.get(`/profile/${username}`);
};


const update = (id, data) => {
  return http.put(`/profile_details/${id}`, data);
};

const remove = id => {
  return http.delete(`/profile_details/${id}`);
};

export default {
  get,
  update,
  remove,
};
