import axios from "axios";

let serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

let commonAttrs = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const signup = async (body) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/user/signup`,
    body,
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const login = async (body) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/user/login`,
    body,
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const logout = async () => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/user/logout`,
    {},
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const isLoggedIn = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/user/login`, {
    ...commonAttrs,
  });
  return res;
};

// export const register = async (body) => {
//   const res = await axios.post(`http://${serverAddress}/api/v1/login`, body, {
//     ...commonAttrs,
//   });
// };
