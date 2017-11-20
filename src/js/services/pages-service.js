import axios from 'axios';


export function getAll() {
  return axios.get('/api/paginas/')
    .then(response => response.data);
};

export function persistOne(name) {
  return axios.post('/api/paginas/', { name })
    .catch(console.error);
};

export function persistNewPoll(pageId, poll) {
  return axios.post(`/api/paginas/${pageId}/poll`, poll)
    .catch(console.error);
};

export function getPoll(pageId) {
  return axios.get(`/api/paginas/${pageId}/poll`)
    .then(response => response.data)
    .catch(console.error);
};

export function votePoll(pageId, optionId) {
  return axios.put(`/api/paginas/${pageId}/poll`, { selectedOption: optionId });
};
