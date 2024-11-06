import firebaseConfig from 'config/firebaseConfig';
import React, { Component } from 'react';
import { Routes } from 'react-router-dom';

import { ProtectedRoute } from 'ProtectedRoute';
import {
  HOME, DETAIL_MEAL_INFO, LOG_IN, SING_UP,
} from 'constants/pathnames';

import { HomePage } from 'components/Home';
import { MealInfo } from 'components/DetailMealInfo/';
import { LoginForm } from 'components/auth/Login';
import { RegisterForm } from 'components/auth/Register';

const PAGENOTFOUND = () => <div className='page-not-found'>PAGE 404 NOT FOUND</div>;

const route = [
  {
    id: 1,
    exact: true,
    path: HOME,
    protected: true,
    component: HomePage,
  },
  {
    id: 2,
    exact: true,
    path: DETAIL_MEAL_INFO,
    protected: true,
    component: MealInfo,
  },
  {
    id: 3,
    exact: true,
    path: LOG_IN,
    protected: false,
    component: LoginForm,
  },
  {
    id: 4,
    exact: true,
    path: SING_UP,
    protected: false,
    component: RegisterForm,
  },
  {
    id: 5,
    component: PAGENOTFOUND,
  },
];

export class Router extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
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
          <ProtectedRoute
            protectedRoute={el.protected}
            key={el.id}
            exact={el.exact}
            path={el.path}
            component={el.component}
          />
        ))}
      </Routes>
    );
  }
}
