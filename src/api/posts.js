import api from "../helpers/api";

const get = ({ page, title, content }, token) => {
  return api.get(`/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page,
    },
  });
};

const post = (payload, token) => {
  return api.post("/posts", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  get,
  post,
};
