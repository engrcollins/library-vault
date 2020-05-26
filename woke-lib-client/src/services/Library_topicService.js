import http from "../http-common";

const getAll = () => {
  return http.get("/library_topics");
};

const get = topic_id => {
  console.log(topic_id)
return http.get(`/library_topics/${topic_id}`);
};

const create = data => {
  console.log(data)
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
