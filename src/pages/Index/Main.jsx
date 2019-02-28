import React, { Component } from "react";
import { Icon } from "antd";
import { apiRequest } from "@/services/api";

class Main extends Component {
  state = {
    name: "react-feeo"
  };

  async componentDidMount() {
    const requestData = {
      page: 0,
      pageSize: 0,
      status: 0
    };

    const response = await apiRequest.post("list", requestData);
    console.log(response);
  }

  asyncModuleHandle() {
    import(/* webpackChunkName: "async-module" */ "./async-module").then(
      ({ a }) => a("hello feeo")
    );
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div className="list">{name}</div>
        <i className="logo" />
        <br />
        <Icon type="step-backward" />
        <br />
        <a href="#/Play">PLAY</a>
        <Icon type="step-backward" />
        <br />
        <a href="#/Hooks">Hooks</a>
        <br />
        <a href="#/HooksRedux">Hooks-redux</a>
        <br />
        <button onClick={() => this.asyncModuleHandle()}> async-module</button>
        <br />
        4545
      </div>
    );
  }
}

export default Main;
