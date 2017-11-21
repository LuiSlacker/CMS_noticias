import axios from 'axios';

export function login(username, password) {
  return axios.post('/api/users/login', { username, password })
    .then(response => response.data);
}

export function signup(username, password, email) {
  return axios.post('/api/users/signup', { username, password, email })
    .then(response => response.data)
    .catch(console.error);
}

export function logout() {
  return axios.get('/api/users/logout')
    .catch(console.error);
}

export function createNewUser(username, email) {
  return axios.post('/api/users/create', { username, email })
    .then(response => response.data)
    .catch(console.error);
}

export function getAll() {
  return axios.get('/api/users/')
    .then(response => response.data)
    .catch(console.error);
}

export function updateAssignedPages(userId, assigedPagesOptions) {
  const assignedPages = assigedPagesOptions.map(pageOption => pageOption.value);
  return axios.patch(`/api/users/${userId}`, { assignedPages })
    .then(response => response.data)
    .catch(console.error);
}

export function fetchAssignedPageIds(userId) {
  return axios.get(`/api/users/${userId}/assignedPages`)
    .then(response => response.data.map(page => page._id))
    .catch(console.error);
}

export function fetchAssignedPages(userId) {
  return axios.get(`/api/users/${userId}/assignedPages`)
    .then(response => response.data)
    .catch(console.error);
}
