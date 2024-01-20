import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../selectors';

interface IRouteProps {
  children?: React.ReactNode;
  hasRole?: string[];
  component: React.ComponentType<{ children?: React.ReactNode }>;
}

const Layout: React.FC<IRouteProps> = ({
  children,
  hasRole,
  component: Component,
}) => {
  const user = useSelector(selectUser);

  if (!user.isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (
    user.isLoggedIn &&
    hasRole != null &&
    !(hasRole.includes('user.currentPerfil') || hasRole.includes('*'))
  ) {
    return <Navigate to="/home" />;
  }

  return <Component>{children}</Component>;
};
export default Layout;
