import React from "react";
import { render } from "react-dom";
import PageHeader from "@/Components/PageHeader";
import PageFooter from "@/Components/PageFooter";

export default Component => {
  render(
    <>
      <PageHeader />
      {Component}
      <PageFooter />
    </>,
    document.getElementById("root")
  );
};
