/**
 * @author: kirk
 * @date: 2019-02-27 10:05:25
 */
import React from "react";
import { ContextProvider } from "./HooksRedux.reducer";
import HooksRedux1 from "./HooksRedux.1";
import HooksRedux2 from "./HooksRedux.2";

function Counter() {
  return (
    <ContextProvider>
      <HooksRedux1 />
      <br />
      <HooksRedux2 />
    </ContextProvider>
  );
}
export default Counter;
