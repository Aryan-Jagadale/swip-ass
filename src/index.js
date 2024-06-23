import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </BrowserRouter>,
    rootElement
  );
}

// ReactDOM.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </Provider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
// reportWebVitals();
