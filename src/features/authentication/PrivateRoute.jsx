import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router';

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = useSelector((state) => state.authentication);

  return token ? <Route path={path} {...props} /> : <Navigate to="/login" replace />;
};
