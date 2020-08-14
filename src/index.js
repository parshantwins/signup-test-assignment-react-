import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./App";

import "./assets/base.scss";
// import Main from "./DemoPages/Main";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);

// if (module.hot) {
//     module.hot.accept('./DemoPages/Main', () => {
//         const NextApp = require('./DemoPages/Main').default;
//         renderApp(NextApp);
//     });
// }
serviceWorker.unregister();
