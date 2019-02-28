/**
 * Created by Kirk liu on 2018/7/3.
 */
import React from "react";
import { Provider } from "react-redux";
import store from "@/models/index/store";
import reactDom from "@/utils/reactDom";
import Router from "./Router";

import "@/assets/css/Index.pcss";

const Index = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);
reactDom(<Index />);
