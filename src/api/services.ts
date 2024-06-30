import axios from "axios";
import { message } from "antd";

export const service = axios.create({
  // Set the baseur address. If you cross domains through proxy, you can directly fill in the base address
  baseURL: "",
  // Define unified request headers
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  // Configure request timeout
  timeout: 60000,
});
// Request interception
service.interceptors.request.use((config) => {
  return config;
});
service.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status !== 200) {
      message.open({
        content: `The server is abnormal ${status}`,
        type: "error",
      });
      return Promise.reject(response);
    } else {
      //   const { code } = response.data;
      //   if (code !== 200) {
      //       message.open({
      //         content: "Error" +,
      //         type: "error",
      //       });
      //     return Promise.reject(response);
      //   }

      return response.data;
    }
  },
  (error) => {
    message.open({
      content: error.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);
