import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles/icons/icons.css";
import "./styles/dark.css";
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';
import {Provider} from "react-redux"
import {store} from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

