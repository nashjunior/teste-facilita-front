import App from './App';
import ReactDOM from 'react-dom/client';
import React from 'react';

const element = document.getElementById('root');

if (element != null)
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
