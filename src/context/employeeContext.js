import { createContext, useContext } from "react";


const employeeContext = createContext();
export const EmployeeContextProvider = employeeContext.Provider;

function  useEmplyeeContext() {
  return useContext(employeeContext);
}


export default useEmplyeeContext;