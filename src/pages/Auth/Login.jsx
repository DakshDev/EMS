import { useEffect, useState } from "react";
import Toastify, {notifyError, notifySuccess, notifyWarn} from "../../thirdparty/toastify";
import useEmplyeeContext from "../../context/employeeContext";

const authAdmin = {
  name: "admin",
  pass: "admin"
}




function LoginBox({customCls ,title, formSubmitHandler, inpNameTitle, placeholderNameTitle, placeholderPassTitle, anotherLoginTitle, whoLogin, setWhoLogin}) {

  function changeLoginUser() {
    if(whoLogin == "admin"){
      setWhoLogin("employee")
    }else{
      setWhoLogin("admin")
    }
  }

  return (
    <div className={`${customCls} p-10 rounded-md flex flex-col gap-10`}>
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <form autoComplete="off" onSubmit={formSubmitHandler} className="flex flex-col gap-2 w-full">
        <label htmlFor="labelName">
          <span>{inpNameTitle}</span>
          <input type="text" id="labelName" name="name" placeholder={placeholderNameTitle}/>
        </label>
        <label htmlFor="labelPass">
          <span>Password</span>
          <input type="text" id="labelPass" name="password" placeholder={placeholderPassTitle}/>
        </label>
        <button type="submit" className="priButton">Login</button>
        <div className="flex justify-center items-center">
          <span className="text-center underline text-blue-500 cursor-pointer font-bold text-lg active:text-blue-700" onClick={changeLoginUser}>{anotherLoginTitle} Login</span>
        </div>
      </form>
    </div>
  )
}



function  Login({setIsAdminLogin}) {

  const {empList, whoIsLogin, setWhoIsLogin} = useEmplyeeContext();
  const [whoLogin, setWhoLogin] = useState("admin");

  // Admin Login Handler
  const adminFormSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const pass = e.target.password.value;

    if(!(name && pass)){
      notifyError("Fill The Field");
    }else{
      if((name == authAdmin.name) && (pass == authAdmin.pass)){
        setIsAdminLogin(true);
        localStorage.setItem("adminLogin", "true");
      }else{
        notifyWarn("Wrong Information")
      }
    }
  };


  // Employee Login Handler
  const employeeFormSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const pass = e.target.password.value;
    if(!(name && pass)){
      notifyError("Fill The Field");
    }else{
      const hasEmployee = empList.filter(emp => {
        return (name == emp.auth.id) && (pass == emp.auth.password);
      });

      if(hasEmployee.length == 0){
        setWhoIsLogin([]);
        notifyWarn("Wrong Information")
      }else{
        setWhoIsLogin(...hasEmployee);
      }
      
    }
  };

  return (
    <>
    {/* <LoginBox /> */}
    <div className="w-full h-screen bg-priBgClr flex flex-col gap-2 items-center justify-center">
      <div className="w-[400px]">
        {whoLogin == "admin" ? 
        <LoginBox customCls="bg-emerald-200" whoLogin={whoLogin} setWhoLogin={setWhoLogin} title="Admin Login" formSubmitHandler={adminFormSubmitHandler} inpNameTitle="Name" placeholderNameTitle="Name (admin)" placeholderPassTitle="Password (admin)" anotherLoginTitle="Employee"/> :
        <LoginBox customCls="bg-blue-200" whoLogin={whoLogin} setWhoLogin={setWhoLogin} title="Employee Login" formSubmitHandler={employeeFormSubmitHandler} inpNameTitle="User Id" placeholderNameTitle="User Id" placeholderPassTitle="Password" anotherLoginTitle="Admin"/> }
      </div>
    </div>
    <Toastify />
    </>
  )
}


export default Login;