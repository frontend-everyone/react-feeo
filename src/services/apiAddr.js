const token = localStorage.getItem("token");

const postApi = (path, mock) => (mock ? "mock" : "") + path + "?token=" + token;

export default {
  list: postApi("/api/list", 1)
};
