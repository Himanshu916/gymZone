import { createContext, useReducer } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatche] = useReducer(reducer, { sortBy: null });
  return (
    <>
      <FilterContext.Provider value={{ sortBy: state.sortBy, dispatche }}>
        {children}
      </FilterContext.Provider>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "sort":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}
