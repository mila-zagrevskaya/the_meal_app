export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length < 6) {
    error = 'Invalid password';
  }
  return error;
};

export const validateConfirmPassword = (repeatPassword, password) => {
  let error;
  if (!repeatPassword) {
    error = 'Required';
  } else if (repeatPassword !== password) {
    error = 'Password missmatch';
  }
  return error;
};
