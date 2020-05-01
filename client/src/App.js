import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import rootReducer from "./reducers/index";
import Alert from "./components/layout/Alert";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert></Alert>
            <Switch>
              <Route path="/login" exact component={Login} />

              <Route path="/register" exact component={Register} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
