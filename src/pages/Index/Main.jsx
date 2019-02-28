import React, { Component } from "react";
import { Icon } from "antd";
import { apiRequest } from "@/services/api";

class Main extends Component {
  state = {
    name: "react-feeo",
    list: []
  };

  async componentDidMount() {
    const requestData = {
      page: 0,
      pageSize: 0,
      status: 0
    };

    const response = await apiRequest.post("list", requestData);
    this.setState({ list: response.list });
    console.log(response);
  }

  mathHandle() {
    import(/* webpackChunkName: "math" */ "../../../src/utils/math.js").then(
      ({ math }) => math(1, 2)
    );
  }

  render() {
    const { name, list } = this.state;
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
        <button onClick={() => this.mathHandle()}>math</button>
        <br />
        {list.length &&
          list.map((data, index) => <li key={index}>{data.title}</li>)}
      </div>
    );
  }
}

export default Main;
