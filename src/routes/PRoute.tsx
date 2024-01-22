import React from 'react';
import { Navigate } from 'react-router-dom';

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
  if (
    hasRole != null &&
    !(hasRole.includes('user.currentPerfil') || hasRole.includes('*'))
  ) {
    return <Navigate to="/home" />;
  }

  return <Component>{children}</Component>;
};
export default Layout;
