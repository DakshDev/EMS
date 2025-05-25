import { useEffect, useRef } from "react";
import {MdSpaceDashboard, FaUser, FaCircleUser, FaRectangleList, FaMoneyBill1Wave} from "../icon/icons"
import { Link, useLocation } from "react-router-dom";


function SideMenuBar() {
  const dashboard = "/";
  const employeeInfoPath = "/employee-info";
  const employeeTaskPath = "/employee-task";

  const myDashboardBtn = useRef();
  const employeeInfoBtn = useRef();
  const employeeTaskBtn = useRef();
  
  const {pathname} = useLocation();

  useEffect(() => {
    myDashboardBtn.current.classList.remove("bg-focusClr")
    employeeInfoBtn.current.classList.remove("bg-focusClr")
    employeeTaskBtn.current.classList.remove("bg-focusClr")
    if(pathname == dashboard) myDashboardBtn.current.classList.add("bg-focusClr");
    if(pathname == employeeInfoPath) employeeInfoBtn.current.classList.add("bg-focusClr");
    if(pathname == employeeTaskPath) employeeTaskBtn.current.classList.add("bg-focusClr");
  }, [pathname])

  return (
    <div className="w-56 flex-grow-0 h-screen border-r border-focusClr p-2 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Admin Panel</h1>
        <div className="flex items-center gap-2 p-4 cursor-pointer rounded-md bg-focusClr">
        <span><FaCircleUser className="size-6 fill-focusClr2"/></span>
        <span>Jhon Doe</span>
      </div>
      </div>
      <div className="grid gap-2">
        <Link ref={myDashboardBtn} to={dashboard} className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md">
          <span><MdSpaceDashboard className="size-5 fill-focusClr2"/></span>
          <span className="text-focusClr2">My Dashboard</span>
        </Link>
        <Link ref={employeeInfoBtn} to={employeeInfoPath} className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md">
          <span><FaUser className="size-5 fill-focusClr2"/></span>
          <span className="text-focusClr2">Employee Info</span>
        </Link>
        <Link ref={employeeTaskBtn} to={employeeTaskPath} className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md">
          <span><FaRectangleList className="size-5 fill-focusClr2"/></span>
          <span className="text-focusClr2">Employee Task</span>
        </Link>
      </div>
    </div>
  )
}

export default SideMenuBar