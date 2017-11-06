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

export function persistOne(pageId, noticiaObject) {
  return axios.post(`/api/paginas/${pageId}/notices`, noticiaObject)
    .then(response => response.data)
};
