import config from '../config';

export const isUserLoggedIn = () => {

  return new Promise((resolve, reject) => {

    fetch(`${config.serverBaseURL}/auth/user`, { credentials: 'include' })
      .then(response => response.json())
      .then(response => {
        resolve(response._id ? true : false);
      });

  });

};
