import React from 'react';
import { Navigate } from 'react-router-dom';

import { Header } from 'components/Header';

export const ProtectedRoute = ({ component: Component, protectedRoute, ...rest }) => {
  const user = localStorage.getItem('userIsAuthorized');

  if (protectedRoute && !user) {
    return <Navigate to='/login' replace/>;
  }

  return (
    <>
      <Header />
      <Component {...rest} />
    </>
  );
};
