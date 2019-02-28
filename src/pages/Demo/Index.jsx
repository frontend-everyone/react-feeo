import React, { Component } from "react";
import reactDom from "@/utils/reactDom";

class Index extends Component {
  state = {
    name: "123"
  };

  render() {
    const { name } = this.state;
    return <div>{name}666111</div>;
  }
}

reactDom(<Index />);
