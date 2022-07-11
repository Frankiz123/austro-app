import XHR from "./api";
import * as ROUTES from "./urls";

export const getMerchants = async (params) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${params}`,
    "Content-Type": "application/json",
  };
  const res = await XHR.get(ROUTES.MERCHANTS, headers);
  return res;
};
export const getItems = async (params) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${params}`,
    "Content-Type": "application/json",
  };
  const res = await XHR.get(ROUTES.ITEMS, headers);
  return res;
};

export const getMedicalStores = async (params) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${params}`,
    "Content-Type": "application/json",
  };
  const res = await XHR.get(ROUTES.MEDICAL_STORE, headers);
  return res;
};
export const getOrders = async (params) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${params}`,
    "Content-Type": "application/json",
  };
  const res = await XHR.get(ROUTES.GET_ORDERS, headers);
  return res;
};

export const sendLocation = async (params) => {
  const { token, title, status, fields } = params;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    title,
    status,
    fields,
  });
  const res = await XHR.post(ROUTES.SEND_LOCATION, body, headers);
  return res;
};

export const getJourney = async (params) => {
  const { token, startDate } = params;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const res = await XHR.get(
    `${ROUTES.GET_JOURNEY}?modified_after=${startDate}&?modified_before=${startDate}`,
    headers
  );
  return res;
};
