import { Route, Navigate } from 'react-router';

export const PrivateRoute = ({ path, ...props }) => {
  const token = true;

  return token ? <Route path={path} {...props} /> : <Navigate to="/login" replace />;
};
