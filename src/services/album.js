import config from '../config';

export const saveAlbum = albumDetails => {

  return new Promise((resolve, reject) => {

    fetch(`${config.serverBaseURL}/album`, { 
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(albumDetails),
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    .then(response => response.json())
    .then(response => {
      resolve(response);
    });

  });

};

export const deleteAlbum = (id) => {

  return new Promise((resolve, reject) => {

    fetch(`${config.serverBaseURL}/album?id=${id}`, { 
      method: 'delete',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(response => {
      resolve(response);
    });

  });

};

export const getAlbums = () => {

  return new Promise((resolve, reject) => {

    fetch(`${config.serverBaseURL}/album`, { 
      method: 'get',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(response => {
      resolve(response);
    });

  });

};