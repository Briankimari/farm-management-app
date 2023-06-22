import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// initializing redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './context/Global';
import authReducer from "./state/index"
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';

const store= createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
    <HashRouter>
        <GlobalProvider>
            <App/>   
        </GlobalProvider> 
  
    </HashRouter>
     </Provider>
); 





