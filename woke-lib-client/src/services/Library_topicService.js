import http from "../http-common";

const getAll = () => {
  return http.get("/library_topics");
};

const get = id => {
  return http.get(`/library_topics/${id}`);
};

const create = data => {
  return http.post("/library_topics", data);
};

const update = (id, data) => {
  return http.put(`/library_topics/${id}`, data);
};

const remove = id => {
  return http.delete(`/library_topics/${id}`);
};

const removeAll = () => {
  return http.delete(`/library_topics`);
};

const findByTitle = title => {
  return http.get(`/library_topics?title=${title}`);
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
