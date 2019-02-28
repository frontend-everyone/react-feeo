/**
 * @author: kirk
 * @date: 2019-02-19 16:44:59
 */
import React, { PureComponent } from "react";

class PageHeader extends PureComponent {
  state = {};

  render() {
    return (
      <footer>
        <p>Posted by: W3School</p>
        <p>
          Contact information:{" "}
          <a href="mailto:someone@example.com">someone@example.com</a>.
        </p>
      </footer>
    );
  }
}
export default PageHeader;
