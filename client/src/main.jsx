import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './state/configureStore.js'
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <App />
    <ToastContainer
        position="top-center"
        closeButton={true}
        autoClose={true}
        closeOnClick={false}
        newestOnTop={true}
        limit={1}
        className="toast-container"
      />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
