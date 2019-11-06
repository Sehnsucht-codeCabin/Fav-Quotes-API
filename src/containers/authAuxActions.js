/* eslint-disable max-len */
import axios from '../../axios-config';

const logInUser = (requiredComponent) => {

  const authData = {
    user: {
      login: requiredComponent.state.controls.email.value,
      password: requiredComponent.state.controls.password.value,
    },
  };

  if (authData.user.login === '' || authData.user.password === '') {
    // eslint-disable-next-line no-alert
    alert('Email and password required!');
    return;
  }

  axios
    .post('/session', authData)
    .then((response) => {
      // check to see if there were validation error
      if (response.data.error_code && response.data.error_code === 21 && response.data.message === 'Invalid login or password.') {
        alert('ERROR! Invalid login or password.');
      } else {
        localStorage.setItem('sessionToken', response.data['User-Token']);
        localStorage.setItem('userLogin', response.data.login);
        localStorage.setItem('notActiveSession', 'false');
        requiredComponent.props.onSuccessAuth();
      }
    })
    .catch(() => {
      requiredComponent.props.onFailAuth();
    });
}

export default logInUser;
