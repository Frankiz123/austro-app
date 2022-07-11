import apiActions from "@apis";

export const getLoginData = (params) => {
  return apiActions
    .getLoginData(params)
    .then((resp) => {
      return resp;
    })
    .catch((e) => {
      console.log("getLoginData errr is ---", e);
      throw e;
    });
};
export const completeOrder = (params) => {
  return apiActions
    .completeOrder(params)
    .then((resp) => {
      return resp;
    })
    .catch((e) => {
      console.log("complete Order errr is ---", e);
      throw e;
    });
};
