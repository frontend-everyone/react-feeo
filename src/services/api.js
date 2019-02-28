import { message } from "antd";

import request from "@/utils/request";
import apiAddr from "./apiAddr";

const fetchFun = async (method, url, params, msg, ck) => {
  const response = await request(apiAddr[url], { method, body: params });
  if (!response) return;
  if (response.code === 0) {
    msg && message.success(msg);
    ck && ck();
    return response.data;
  }
  message.error("SYS: " + response.code + " " + response.message);
};

export const apiRequest = {
  get: async (url, params, msg, ck) =>
    await fetchFun("GET", url, params, msg, ck),
  post: async (url, params, msg, ck) =>
    await fetchFun("POST", url, params, msg, ck)
};
