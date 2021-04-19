import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function addMessageApi(message) {
  const url = `${API_HOST}/message`;
  const data = {
    message,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return {
          code: response.status,
          message: "Message sent successfully!",
        };
      }
      return { code: 500, message: "Server error." };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserMessagesApi(idUser, page) {
  const url = `${API_HOST}/readMsg?id=${idUser}&page=${page}`;

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
    .catch((err) => {
      return err;
    });
}

export function getFollowersMessagesApi(page = 1) {
  const url = `${API_HOST}/getFollowersMsg?page=${page}`;

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
    .catch((err) => {
      return err;
    });
}
