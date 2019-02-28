/**
 * @author: kirk
 * @date: 2019-02-27 10:05:25
 */
import React, { useState } from "react";

const Hooks = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
export default Hooks;
