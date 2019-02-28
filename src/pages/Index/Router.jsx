/**
 * Created by Kirk liu on 2018/7/3.
 */
import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import AsyncComponent from "@/Components/AsyncComponent";
import Main from "./Main";

const Index = () => (
  <Router>
    <div className="react-feeo">
      <Route exact path="/" render={() => <Redirect to="/Main" />} />
      <Route path="/Main" component={Main} />
      <Route
        path="/Play"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "index.Play" */ "./Play")
        )}
      />
      <Route
        path="/Hooks"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "index.Hooks" */ "./Hooks")
        )}
      />
      <Route
        path="/HooksRedux"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "index.HooksRedux" */ "./HooksRedux")
        )}
      />
    </div>
  </Router>
);
export default hot(Index);
