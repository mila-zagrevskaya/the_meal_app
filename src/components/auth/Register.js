import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';
import {
  Formik, Form, Field, FieldArray, ErrorMessage,
} from 'formik';
import firebaseConfig from 'config/firebaseConfig';
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
    firebaseConfig.auth().createUserWithEmailAndPassword(email, password);
    history.push(LOG_IN);
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
