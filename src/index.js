import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import {} from 'react-redux';
import { Provider } from "react-redux";
import { createStore } from "redux";

import gameReducer from './store/reducers/Game.reducer';

const store = createStore(gameReducer)


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);