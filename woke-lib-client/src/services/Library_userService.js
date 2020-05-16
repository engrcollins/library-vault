import http from "../http-common";

const getAll = () => {
  return http.get("/library_users");
};

const get = id => {
  return http.get(`/library_users/${id}`);
};

const create = data => {
  return http.post("/library_users", data);
};

const update = (id, data) => {
  return http.put(`/library_users/${id}`, data);
};

const remove = id => {
  return http.delete(`/library_users/${id}`);
};

const removeAll = () => {
  return http.delete(`/library_users`);
};

const findByTitle = title => {
  return http.get(`/library_users?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
