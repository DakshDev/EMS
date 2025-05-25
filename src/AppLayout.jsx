import { Outlet } from "react-router-dom"
import SideMenuBar from "./components/SideMenuBar"
import TopOptionBar from "./components/topOptionBar"
import Login from "./pages/Auth/Login"
// Global Context
import useGlobalContext from "./context/globalContext";
import useEmplyeeContext from "./context/employeeContext";


import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";

function AppLayout(){
  const {isAdminLogin, setIsAdminLogin} = useGlobalContext();
  const {whoIsLogin, setWhoIsLogin} = useEmplyeeContext();

  return (
    <>
    {/* Employee */}
    {whoIsLogin.length != 0 ? 
    <>
    <div id="employeeContainer" className="h-screen bg-priBgClr w-full py-6 px-8 flex flex-col gap-10">
      <TopOptionBar customTitle="My Dashboard" settingSwitchTitle="Admin"/>
      <EmployeeDashboard /> 
    </div>
    </>
    : 
    <>
    {/* Admin */}
    {!isAdminLogin ? <Login setIsAdminLogin={setIsAdminLogin}/> : ""}
    {isAdminLogin ? 
      <div id="adminContainer" className="bg-priBgClr flex">
        <div className="flex-grow-0">
          <SideMenuBar/>
        </div>
        <div className="w-full py-6 px-8 flex flex-col gap-10">
          <TopOptionBar />
          <Outlet />
        </div>
      </div> : ""}
    </>}
    </>
  )
}

export default AppLayout