import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { Header } from 'components/Header';

export const ProtectedRoute = ({ component: Component, protectedRoute, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (protectedRoute) {
        const user = localStorage.getItem('userIsAuthorized');
        if (!user) {
          return <Navigate to='/login' />;
        }
        return (
          <>
            <Header />
            <Component {...props} />
          </>
        );
      }
      return <Component {...props} />;
    }}
  />
);
