/**
 * @author: kirk
 * @date: 2019-02-19 16:44:59
 */
import React, { PureComponent } from "react";
import Loading from "./Common/Loading";

class PageHeader extends PureComponent {
  state = {};

  render() {
    return (
      <header>
        <Loading />
        <h1>Welcome to my homepage</h1>
        <p>My name is Donald Duck</p>
      </header>
    );
  }
}
export default PageHeader;
