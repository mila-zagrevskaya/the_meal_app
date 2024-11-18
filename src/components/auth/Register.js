import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  Formik, Form, Field, FieldArray, ErrorMessage,
} from 'formik';
// import firebaseConfig, { auth } from 'config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebaseConfig';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from 'helpers/validationHelpers';
import { Button } from 'components/common/Button';
import { LOG_IN } from 'constants/pathnames';
import './style.scss';

const history = createHashHistory();

export class RegisterForm extends Component {
  signupHandler = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password) // Correct function call
      .then(() => {
        history.push(LOG_IN);
      })
      .catch((error) => {
        console.error('Signup failed:', error.message);
      });
  };

  render() {
    return (
      <div className='content-container'>
        <h1>Sign up</h1>
        <div className='auth-form '>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => {
              this.signupHandler(values);
            }}>
            {({ isSubmitting, values }) => (
              <Form>
                <FieldArray>
                  <>
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
                    <div className='field-wrapper'>
                      <Field
                        type='password'
                        placeholder='Repeat password'
                        name='confirmPassword'
                        className='input-auth'
                        validate={(value) => validateConfirmPassword(value, values.password)}
                      />
                      <ErrorMessage
                        name='confirmPassword'
                        component='p'
                        className='error-message'
                      />
                    </div>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='auth-button'
                      text='Create account'
                    />
                  </>
                </FieldArray>
              </Form>
            )}
          </Formik>
          <Link to={LOG_IN} className='go-to-singup'>
            I have account
          </Link>
        </div>
      </div>
    );
  }
}
