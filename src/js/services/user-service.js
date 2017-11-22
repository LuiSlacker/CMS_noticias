import axios from 'axios';

export function login(email, password) {
  return axios.post('/api/users/login', { email, password })
    .then(response => response.data);
}

export function signup(password, token) {
  return axios.post('/api/users/signup', { password, token })
    .then(response => response.data);
}

export function forgotPassword(email) {
  return axios.post('/api/users/forgotPassword', { email })
    .then(response => response.data);
}

export function logout() {
  return axios.get('/api/users/logout')
    .catch(console.error);
}

export function toggleUserState(userId) {
  return axios.delete(`/api/users/${userId}`)
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

export function getUserInfoForToken(token) {
  return axios.get(`/api/users/userfortoken/${token}`)
    .then(response => response.data)
    .catch(console.error);
}
