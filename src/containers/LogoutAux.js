/* eslint-disable linebreak-style */
import axios from '../../axios-config';

const logoutAux = (logout) => {
  axios.delete('/session')
    .then((response) => {
      console.log(response.data.message);
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userLogin');
      localStorage.removeItem('notActiveSession');
      logout();
    })
    .catch((error) => {
      console.log(error.data.message);
    });
};

const clearSession = (setNotActiveSession) => {
  const minutesMore = 30;
  const timeAmountBeforeExpiring = 60000 * minutesMore;
  const joinedDate = Date.now() + timeAmountBeforeExpiring;
  localStorage.setItem('expirationDate', new Date(joinedDate));
  setTimeout(() => {
    console.log('REMOVING SESSION...');
    localStorage.setItem('notActiveSession', 'true');
    setNotActiveSession();
  }, timeAmountBeforeExpiring);
};

export { logoutAux, clearSession };
