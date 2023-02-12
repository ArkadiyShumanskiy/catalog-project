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

export const getProducts = (token) => {
  return fetch("https://api.react-learning.ru/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getProductById = (token, productId) => {
  return fetch(`https://api.react-learning.ru/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getProductsByIds = (token, productIds) => {
  return Promise.all(productIds.map((productId) => fetch(`https://api.react-learning.ru/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(resp => resp.json())));
};

export const getCurrentUser = (token) => {
  return fetch("https://api.react-learning.ru/v2/sm8/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
