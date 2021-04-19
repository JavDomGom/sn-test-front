import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
  const url = `${API_HOST}/checkFollow?id=${idUser}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function followUserApi(idUser) {
  const url = `${API_HOST}/newFollow?id=${idUser}`;

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function unfollowUserApi(idUser) {
  const url = `${API_HOST}/deleteFollow?id=${idUser}`;

  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getUsersApi(paramsUrl) {
  const url = `${API_HOST}/getUsers?${paramsUrl}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
