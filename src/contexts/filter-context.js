import { createContext, useReducer } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatche] = useReducer(reducer, { sortBy: null,searchText:"",saveSearch:"",searched:false });
  return (
    <>
      <FilterContext.Provider value={{ sortBy: state.sortBy, dispatche,searchText:state.searchText,saveSearch:state.saveSearch }}>
        {children}
      </FilterContext.Provider>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "sort":
      return { ...state, sortBy: action.payload };
   
    case "search" :
     
      return {...state,searchText:action.payload};
    case "saveSearchText":
      return {...state,searchText:"",saveSearch:action.payload}
    case "searched" :
      return {...state,searched:action.payload}
      default:
        return state;
      
  }
}
