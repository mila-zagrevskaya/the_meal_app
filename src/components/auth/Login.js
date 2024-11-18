import React from 'react';
// import firebaseConfig, { auth } from 'config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { validateEmail, validatePassword } from 'helpers/validationHelpers';
import { Button } from 'components/common/Button';
import './style.scss';
import { HOME, SING_UP } from 'constants/pathnames';

const LoginForm = () => {
  const navigate = useNavigate();

  const loginHandler = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userIsAuthorized = JSON.stringify(userCredential.user.uid);
        localStorage.setItem('userIsAuthorized', userIsAuthorized);
        navigate(HOME);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          console.error('Login failed: Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          console.error('Login failed: User not found');
        } else {
          console.error('Login failed:', error.message);
        }
      });
  };

  return (
    <div className="content-container">
      <h1>Please, login</h1>
      <div className="auth-form ">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => loginHandler(values)}>
          {({ isSubmitting }) => (
              <Form>
                <div className="field-wrapper">
                  <Field
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="input-auth"
                    validate={validateEmail}
                  />
                  <ErrorMessage name="email" component="p" className="error-message" />
                </div>
                <div className="field-wrapper">
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input-auth"
                    validate={validatePassword}
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="auth-button login-button" text="Login" />
              </Form>
          )}
        </Formik>
        <Link to={SING_UP} className="go-to-singup">
            Don`t have account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
