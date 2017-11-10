import axios from 'axios';

export function getAllForOnePage(pageId) {
  return axios.get(`/api/paginas/${pageId}/notices`)
    .then(response => {
      return response.data
    })
    .catch(console.error);
};

export function getOneById(pageId, noticesId) {
  return axios.get(`/api/paginas/${pageId}/notices/${noticesId}`)
    .then(response => response.data);
};

export function getAllForOneUser(userId) {
  return axios.get(`/api/notices?userId=${userId}`)
    .then(response => response.data)
};


export function persistOne(pageId, noticiaObject) {
  return axios.post(`/api/paginas/${pageId}/notices`, noticiaObject)
    .then(response => response.data)
};

export function updateOne(noticiaObject) {
  return axios.put(`/api/notices/${noticiaObject._id}/`, noticiaObject)
    .then(response => response.data)
};

