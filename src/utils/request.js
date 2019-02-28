import { message } from "antd";

export default function request(url, option) {
  const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.name = response.status;
    error.response = response.statusText;
    throw error;
  };
  const defaultOptions = {
    credentials: "include"
  };
  const options = {
    ...option
  };
  const newOptions = { ...defaultOptions, ...options };

  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers
      };
    }
  } else {
    delete newOptions.body;
  }
  console.log(newOptions);
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response)
    .catch(e => {
      const status = e.name;
      message.error("ERR: " + status + " " + e.response);
    });
}
