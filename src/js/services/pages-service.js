import axios from 'axios';


export function getAll() {
  return axios.get('/api/paginas/')
    .then(response => response.data);
};

export function persistOne(name) {
  return axios.post('/api/paginas/', { name })
    .catch(console.error);
};

// export function getOneById(pageId, noticesId) {
//   return axios.get(`/api/paginas/${pageId}/notices/${noticesId}`)
//     .then(response => response.data);
// };
