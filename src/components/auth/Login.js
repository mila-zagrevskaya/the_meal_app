import React, { Component } from 'react';
import firebaseConfig from 'config/firebaseConfig';
import { Link } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { validateEmail, validatePassword } from 'helpers/validationHelpers';
import { Button } from 'components/common/Button';
import './style.scss';
import { HOME, SING_UP } from 'constants/pathnames';

export class LoginForm extends Component {
  loginHandler = ({ email, password }) => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const userIsAuthorized = JSON.stringify(user.user.uid);
        localStorage.setItem('userIsAuthorized', userIsAuthorized);
        this.props.history.push(HOME);
      });
  };

  render() {
    return (
      <div className='content-container'>
        <h1>Please, login</h1>
        <div className = 'auth-form '>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => this.loginHandler(values)}>
          {({ isSubmitting }) => (
            <Form>
              <div className='field-wrapper'>
                <Field
                  type='email'
                  placeholder='Email'
                  name='email'
                  className='input-auth'
                  validate={validateEmail}
                />
                <ErrorMessage name='email' component='p' className='error-message' />
              </div>
              <div className='field-wrapper'>
                <Field
                  type='password'
                  placeholder='Password'
                  name='password'
                  className='input-auth'
                  validate={validatePassword}
                />
                <ErrorMessage name='password' component='div' className='error-message' />
              </div>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='auth-button login-button'
                text='Login'
              />
            </Form>
          )}
        </Formik>
        <Link to={SING_UP} className='go-to-singup'>
          Don`t have account
        </Link>

        </div>
      </div>
    );
  }
}
