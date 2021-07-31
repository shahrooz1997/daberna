import axios from "axios";

let serverAddress = "localhost:3600";

let commonAttrs = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createGame = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/game`, {
    ...commonAttrs,
  });
  return res;
};

export const joinGame = async (body) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game/join`,
    body,
    {
      ...commonAttrs,
    }
  );
  return res;
};