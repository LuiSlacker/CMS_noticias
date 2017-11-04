import axios from 'axios';


export function getAllForOnePage(pageId) {
  return axios.get(`/api/paginas/${pageId}`)
    .then(response => {
      console.log('asd')
      return response.data;
    });
};

export const getOneById = (pageId) => axios.get(`/api/paginas/${pageId}`);
