import http from "../http-common";

const get = topic_id => {
    console.log(topic_id)
  return http.get(`/library_topic/${topic_id}`);
};

export default {
  get,
};
