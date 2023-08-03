import React from 'react'
import {Provider} from "react-redux"
// import store from "./useRedux/store.js"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from "./Components/useRedux/store.js"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>,
  </React.StrictMode>,
)
