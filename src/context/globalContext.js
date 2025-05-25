import { createContext, useContext } from "react";

const globalContext = createContext();

export const GlobalContextProvider = globalContext.Provider;


export default function useGlobalContext(){
  return useContext(globalContext)
}