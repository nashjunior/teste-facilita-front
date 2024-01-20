import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Layout from './PRoute';

const LazyECommerceLayout = React.lazy(
  async () => await import('../components/layout/private/ecommerce')
);

const LazyClient = React.lazy(async () => await import('../pages/users/new'));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Carregando...</div>}>
              <Layout hasRole={['*']} component={LazyECommerceLayout}></Layout>
            </Suspense>
          }
        >
          <Route path="users">
            <Route
              path="new"
              element={
                <Suspense fallback={<div>Carregando...</div>}>
                  <LazyClient />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
