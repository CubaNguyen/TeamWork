import api from "../utils/axiosConfig";

const getRecommend = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.post("/recommend", fd, {
    headers: { "Content-Type": undefined }, // ép bỏ JSON header
  });
};

export { getRecommend };
