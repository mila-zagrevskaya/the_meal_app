import { auth } from 'config/firebaseConfig';
import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from 'ProtectedRoute';
import {
  HOME, DETAIL_MEAL_INFO, LOG_IN, SING_UP,
} from 'constants/pathnames';

import LoginForm from 'components/auth/Login';
import { HomePage } from 'components/Home';
import { MealInfo } from 'components/DetailMealInfo/';
import { RegisterForm } from 'components/auth/Register';

const PAGENOTFOUND = () => <div className='page-not-found'>PAGE 404 NOT FOUND</div>;

const route = [
  {
    id: 1,
    path: HOME,
    protected: true,
    component: HomePage,
  },
  {
    id: 2,
    path: DETAIL_MEAL_INFO,
    protected: true,
    component: MealInfo,
  },
  {
    id: 3,
    path: LOG_IN,
    protected: false,
    component: LoginForm,
  },
  {
    id: 4,
    path: SING_UP,
    protected: false,
    component: RegisterForm,
  },
];

export class Router extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('userIsAuthorized', user.uid);
      } else {
        localStorage.removeItem('userIsAuthorized');
      }
    });
  };

  render() {
    return (
      <Routes>
        {route.map((el) => (
          <Route
            key={el.id}
            path={el.path}
            element={
              el.protected ? (
                <ProtectedRoute
                  protectedRoute={el.protected}
                  component={el.component} />
              ) : (
                <el.component />
              )
            }
          />
        ))}
        <Route path="*" element={<PAGENOTFOUND />} />
      </Routes>
    );
  }
}
