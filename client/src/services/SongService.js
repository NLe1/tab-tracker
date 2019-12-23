import Api from "./Api";

export default {
  index(search) {
    return Api().get("songs", {
      params: {
        search
      }
    });
  },
  post(data) {
    return Api().post("songs", data);
  },
  show(songId) {
    return Api().get(`songs/${songId}`);
  },
  put(data) {
    return Api().put(`songs/${data.id}`, data);
  }
};
