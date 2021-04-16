import { createContext, useState } from "react";

export const categoryContext = createContext();

export const CategoryProvider = function ({ children }) {
  const [router, setRouter] = useState("sports");

  return (
    <>
      <categoryContext.Provider value={{ router, setRouter }}>
        {children}
      </categoryContext.Provider>
    </>
  );
};
