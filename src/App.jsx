import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./AppLayout"
import EmployeeInfo from "./pages/EmployeeInfo/EmployeeInfo"
import EmployeeTask from "./pages/EmployeeTask/EmployeeTask"
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import { useEffect, useState } from "react"
// Context API
import {GlobalContextProvider} from "./context/globalContext"
import {EmployeeContextProvider} from "./context/employeeContext"

function App() {

// ================= Global Context ================= //
  // Currency Code
  const [currencyCode, setCurrencyCode] = useState("$");
  const [empList, setEmpList] = useState(() => {
    const localData = localStorage.getItem("employees");
    return JSON.parse(localData) || [];
  })
  // Is Admin Login
  const [isAdminLogin, setIsAdminLogin] = useState(() => {
    const localData = localStorage.getItem("adminLogin");   
    return JSON.parse(localData) || false;
  });

  // Who Is Login
  const [whoIsLogin, setWhoIsLogin] = useState(() => {
    const localData = localStorage.getItem("employeeLogin");
    return JSON.parse(localData) || []
  });

  useEffect(() => {
    localStorage.setItem("employeeLogin", JSON.stringify(whoIsLogin))

    if(whoIsLogin.length != 0){
    const rmList = empList.filter(list => {
      return list.auth.id != whoIsLogin.auth.id;
    })
    setEmpList([...rmList, whoIsLogin])
    }

    
  }, [whoIsLogin])

  useEffect(() => {
    localStorage.setItem("adminLogin", JSON.stringify(isAdminLogin))
  }, [isAdminLogin])


  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(empList))
  }, [empList])

// ================= Router ================= //
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {path: "/", element: <AdminDashboard />},
        {path: "/employee-info", element: <EmployeeInfo />},
        {path: "/employee-task", element: <EmployeeTask />},
      ]
    }
  ])

  return (
  <GlobalContextProvider value={{currencyCode, setCurrencyCode, isAdminLogin, setIsAdminLogin}}>
    <EmployeeContextProvider value={{empList, setEmpList, whoIsLogin, setWhoIsLogin}}>
      <RouterProvider router={routers}></RouterProvider>
    </EmployeeContextProvider>
  </GlobalContextProvider>
  )
}

export default App