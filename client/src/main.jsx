import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthProvider } from '../store/auth.jsx'

import { store } from './store/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<React.StrictMode>

<Provider store={store}>
  <App />
</Provider>
</React.StrictMode>
</AuthProvider>
);
