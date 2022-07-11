import XHR from "./api";
import * as ROUTES from "./urls";

export const getLoginData = async (params) => {
  const { username, password } = params;
  console.log("params are", params);
  // const body = JSON.stringify({
  //   username: "austroapp",
  //   password: "@B34eF%R4%",
  // });
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  // const body = { ...formData };
  const res = await XHR.post(ROUTES.LOGIN, formData, null);
  return res;
};

export const completeOrder = async (params) => {
  const { token, title, status, content, fields } = params;
  console.log("params in complete orders are", params);
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    title,
    status,
    content,
    fields,
  });

  const res = await XHR.post(ROUTES.COMPLETE_ORDER, body, headers);
  return res;
};
