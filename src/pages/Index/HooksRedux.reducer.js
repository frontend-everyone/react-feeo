import React, { useReducer } from "react";

const initialState = { count: 0 };
const myContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {children}
    </myContext.Provider>
  );
};

export { reducer, myContext, ContextProvider };
