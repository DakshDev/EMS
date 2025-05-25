import BoxInfo from "./components/BoxInfo"
import {FaUser, FaMoneyBill1Wave, FaCircleExclamation, FaCircleCheck} from "../../icon/icons"
// import useEmployeeData from "../../hooks/useEmployeeData"
import { useEffect, useState } from "react";
import useGlobalContext from "../../context/globalContext";
import useEmplyeeContext from "../../context/employeeContext"

import EmployeeTable from "../../components/other/EmployeeTable/EmployeeTable";

function AdminDashboard(){
  // Context API
  const {currencyCode} = useGlobalContext();
  const {empList} = useEmplyeeContext();
  const [totalSalary, setTotalSalary] = useState(0);
  useEffect(() => {
    setTotalSalary(0)
    empList.map(data => setTotalSalary(prev =>  prev + Number(data.salary)));
  }, [empList])


  const [openTotalEmp, setOpenTotalEmp] = useState(true);
  const [openPending, setOpenPending] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  
  function openTotalEmployeeList() {
      setOpenTotalEmp(true)
      setOpenPending(false)
      setOpenCompleted(false)
      setOpenSalary(false)
  }

  function openTotalPendingtask() {
      setOpenTotalEmp(false)
      setOpenPending(true)
      setOpenCompleted(false)
      setOpenSalary(false)
  }
  
  function openTotalCompletedtask() {
      setOpenTotalEmp(false)
      setOpenPending(false)
      setOpenCompleted(true)
      setOpenSalary(false)
  }

  function openTotalTotalSalary() {
      setOpenTotalEmp(false)
      setOpenPending(false)
      setOpenCompleted(false)
      setOpenSalary(true)
  }













  return (
    <div className="flex flex-col gap-10 max-w-7xl w-full mx-auto">
      <div className="flex gap-4 w-full">
        <BoxInfo
        onClick={openTotalEmployeeList}
        className="bg-blue-400"
        link="/"
        component={<FaUser className="size-6 fill-blue-600"/>} total={empList.length} title="Total Employee"/>
        <BoxInfo
        onClick={openTotalPendingtask}
        className="bg-orange-400"
        link="/"
        component={<FaCircleExclamation className="size-6 fill-orange-600"/>} total="134" title="Pending Task"/>
        <BoxInfo 
        onClick={openTotalCompletedtask}
        className="bg-emerald-400"
        link="/"
        component={<FaCircleCheck  className="size-6 fill-emerald-600"/>} total="232" title="Completed Task"/>
        <BoxInfo 
        onClick={openTotalTotalSalary}
        className="bg-purple-400"
        link="/"
        component={<FaMoneyBill1Wave className="size-6 fill-purple-600"/>} total={`${totalSalary} ${currencyCode}`} title="Total Employee Salary"/>
      </div>
      <div className="flex-col flex gap-5">
        <h1 className="text-xl font-bold">Total Employee</h1>
        {/* Total Employee Table */}
        {openTotalEmp ? 
        <div>
          {/* Total Employee */}
          {(empList.length != 0) ? 
          <EmployeeTable
          titleNo={true}
          titleId={true}
          titleName={true}
          titleEmail={true}
          titlePhone={true}
          titleSalary={false}
          titleProfession={false}
          titlePass={false}
          titleSkill={false}
          titleMoreInfo={true}

          colspan={6}

          cellId={true}
          cellName={true}
          cellEmail={true}
          cellPhone={true}
          cellSalary={false}
          cellSkill={false}
          cellProfession={false}
          cellPass={false}
          /> : <span className="text-orange-500 font-bold">No Employees Yet !</span>}

        </div> : ""}

        {/* Total Employee salary */}
        {openSalary ? 
        <div>
          {/* Total Employee */}
          {(empList.length != 0) ? 
          <EmployeeTable
          titleNo={true}
          titleId={true}
          titleName={true}
          titleEmail={false}
          titlePhone={false}
          titleSalary={true}
          titleProfession={false}
          titlePass={false}
          titleSkill={false}
          titleMoreInfo={false}

          colspan={5}

          cellId={true}
          cellName={true}
          cellEmail={false}
          cellPhone={false}
          cellSalary={true}
          cellSkill={false}
          cellProfession={false}
          cellPass={false}
          /> : <span className="text-orange-500 font-bold">No Employees Yet !</span>}

        </div> : ""}
      </div>
    </div>
  )
}

export default AdminDashboard