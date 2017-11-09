import axios from 'axios';

export function login(username, password) {
  return axios.post('/api/users/login',  { username, password })
    .then(response => response.data);
};

export function signup(username, password, email) {
  return axios.post('/api/users/signup', { username, password, email })
    .then(response => response.data)
    .catch(console.error);
};

export function logout() {
  return axios.get('/api/users/logout')
    .catch(console.error);
};
