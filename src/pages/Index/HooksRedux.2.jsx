/**
 * @author: kirk
 * @date: 2019-02-27 10:05:25
 */
import React, { useContext } from "react";
import { myContext } from "./HooksRedux.reducer";

function Counter() {
  const { state, dispatch } = useContext(myContext);
  return (
    <div>
      Counter Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default Counter;
