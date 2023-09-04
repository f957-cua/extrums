import axios from "axios";

class Axios {
  username = "";
  password = "";
  token = "";

  async signUp(username, password) {
    const message = await axios.post("http://localhost:3001/auth/register", {
      username,
      password,
    });
    return message;
  }

  async login(username, password) {
    const res = await axios.post("http://localhost:3001/auth/login", {
      username,
      password,
    });
    const {
      data: { message, token },
    } = res;
    this.setToken(token);
    // axios.defaults.headers.common = {
    //   Authorization: `Bearer ${token}`,
    // };
    return message;
  }

  setToken(token) {
    this.token = token;
  }

  async getCurrent() {
    const res = await axios.get("http://localhost:3001/current", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const {
      data: { currentValue, valueList },
    } = res;
    return { currentValue, valueList };
  }

  async postValue(currentValue) {
    const res = await axios.post(
      "http://localhost:3001/change",
      {
        currentValue,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return res;
  }
}

export const signUp = async (username, password) => {
  const message = await axios.post("http://localhost:3001/auth/register", {
    username,
    password,
  });
  return message;
};

export const login = async (username, password) => {
  const res = await axios.post("http://localhost:3001/auth/login", {
    username,
    password,
  });
  const {
    data: { message, token },
  } = res;
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
  return { message, token };
};

export const getCurrent = async (token) => {
  const res = await axios.get("http://localhost:3001/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const {
    data: { currentValue, valueList, message },
  } = res;
  return { currentValue, valueList, message };
};

export const postValue = async (currentValue, token) => {
  const res = await axios.post(
    "http://localhost:3001/change",
    {
      currentValue,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export default Axios;
