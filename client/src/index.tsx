import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './views/signup/signup';
import Login from './views/login/login';
import CounterView from './views/counter/counter';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/counter" element={<CounterView />}></Route>
          </Routes>
        </BrowserRouter>
    </App>
  </React.StrictMode>
);