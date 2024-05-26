import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext/index.jsx';
import { Provider } from "react-redux"
import { store } from './store/index.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    </Provider>
  </BrowserRouter>
);
