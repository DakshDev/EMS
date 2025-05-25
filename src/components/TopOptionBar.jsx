import { useEffect, useRef, useState } from "react";
import {FaBell, FaGear} from "../icon/icons"
import { useLocation } from "react-router-dom";
import useGlobalContext from "../context/globalContext";
import useEmplyeeContext from "../context/employeeContext";

function TopOptionBar({customTitle, settingSwitchTitle}){

  // Global Context
  const {setIsAdminLogin} = useGlobalContext();
  const {setWhoIsLogin} = useEmplyeeContext();
  // Use Ref
  const settingBox = useRef();

  const {pathname} = useLocation();
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if(pathname == "/") return setPageName("Dashboard");
    if(pathname == "/employee-info") return setPageName("Employee Info");
    if(pathname == "/employee-task") return setPageName("Employee Task");
    if(pathname == "/employee-salary") return setPageName("Employee Salary");
  }, [pathname]);



  function settingHandler(e) {
    e.stopPropagation()
    if(settingBox.current.style.display == "none"){
      settingBox.current.style.display = "block"
    }else{
      settingBox.current.style.display = "none"
    }
  }

  if(document.querySelector("#adminContainer")){
    document.querySelector("#adminContainer").addEventListener("click", () => {
      if(settingBox.current.style.display == "block"){
        settingBox.current.style.display = "none"
      }
    })
  }

  if(document.querySelector("#employeeContainer")){
    document.querySelector("#employeeContainer").addEventListener("click", () => {
      if(settingBox.current.style.display == "block"){
        settingBox.current.style.display = "none"
      }
    })
  }
  


  // switchButtonHandler
  function switchButtonHandler() {
    setIsAdminLogin(false);
    setWhoIsLogin([]);
  }
  

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">{customTitle ? customTitle : pageName}</h1>
      <div className="flex items-center gap-2 relative">
        <span className="p-2 rounded-md bg-priBgClr2 active:bg-focusClr cursor-pointer"><FaBell className="size-5 fill-focusClr2"/></span>
        <span className="p-2 rounded-md bg-priBgClr2 active:bg-focusClr cursor-pointer" onClick={settingHandler}><FaGear className="size-5 fill-focusClr2"/></span>
        {/* on click active */}
        <div onClick={(e) => e.stopPropagation()} ref={settingBox} className="absolute top-full right-0 py-2" style={{display: "none"}}>
          <div className="rounded-md bg-focusClr border border-focusClr2 p-4 flex flex-col gap-4">
            <h1 className="text-center text-xl uppercase">Setting</h1>
            <div className="flex flex-col gap-2">
              <button onClick={switchButtonHandler} className="secButton">Switch&nbsp;{settingSwitchTitle ? settingSwitchTitle : "Employee"}</button>
              <button className="warnButton" onClick={() => {setIsAdminLogin(false); setWhoIsLogin([])}}>Log&nbsp;Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopOptionBar;