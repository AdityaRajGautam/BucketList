import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <MainNavigation/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

