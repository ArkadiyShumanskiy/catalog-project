export const register = (form) => {
  return fetch("https://api.react-learning.ru/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

export const authorize = (form) => {
  return fetch("https://api.react-learning.ru/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

export const getCatalog = () => {
  return fetch("https://api.react-learning.ru/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getCurrentUser = () => {
  return fetch("https://api.react-learning.ru/v2/sm8/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
