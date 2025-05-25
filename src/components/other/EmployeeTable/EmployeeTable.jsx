import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import {FaCheck} from "../../../icon/icons"

import useGlobalContext from "../../../context/globalContext"
import useEmplyeeContext from "../../../context/employeeContext";

// Full Info Box
function FullInfoTableData({taskDetail, endDate, status, title, value, checkStatus, selectTask, selectEmployee}) {
  const {empList, setEmpList} = useEmplyeeContext()
  function successTaskHandler() {
    let updateQueue = JSON.parse(JSON.stringify(selectTask));
    updateQueue.status = "success";
    const rmQueue = selectEmployee.taskInfo.filter(list => {
      return list.task != selectTask.task;
    })
    const updatedTask = [...rmQueue, updateQueue];
    let updateEmployee = JSON.parse(JSON.stringify(selectEmployee))
    updateEmployee.taskInfo = updatedTask;

    const rmEmployee = empList.filter(emp => {
      return emp.auth.id != updateEmployee.auth.id;
    });

    setEmpList([...rmEmployee, updateEmployee])
  }

  return <div className="flex gap-2 items-start flex-nowrap rounded-md p-2 w-fit">

  {taskDetail ? 
    <>
      <span className="shrink-0 capitalize rounded-md p-2 px-4 bg-mainClr text-focusClr">{endDate}</span>
      <span className="rounded-md p-2 px-4 bg-focusClr capitalize">{value}</span>
      {status == "pending" ? <span className="shrink-0 capitalize rounded-md p-2 px-4 bg-orange-500 text-focusClr">{status}</span> : ""}
      {status == "success" ? <span className="shrink-0 capitalize rounded-md p-2 px-4 bg-emerald-500 text-focusClr">{status}</span> : ""}
      {status == "queue" ? 
      <>
      <span className="shrink-0 capitalize rounded-md p-2 px-4 bg-slate-700 text-focusClr">{status}</span>
      <span onClick={successTaskHandler} className="cursor-pointer shrink-0 capitalize rounded-md p-2 px-4 bg-blue-500 text-focusClr flex gap-2 flex-nowrap items-center font-bold">Mark Completed<FaCheck className="size-5 font-bold fill-focusClr" /></span>
      </> : ""}
      
    </>
    :
    <>
      <span className="shrink-0 capitalize rounded-md p-2 px-4 bg-mainClr text-focusClr">{title}</span>
      <span className="rounded-md p-2 px-4 bg-focusClr capitalize">{value}</span>
    </>
  }
    </div>
}

// Heading
function Heading({title, customClass}) {
  return <td className={`p-2 text-focusClr border-x border-focusClr2 uppercase font-bold text-lg ${customClass}`}>{title}</td>
}

// Table Data
function TableData({data, customCls}){
  return <td className={`capitalize p-2 min-w-fit font-bold ${customCls}`}>{data}</td>
}

// Table Row
function TableRow(
  {cellId, cellName, cellEmail, cellPhone, cellSalary, cellSkill, cellProfession, cellPass, titleMoreInfo,
  no, id, fullName, email, profession, skills, phone, password, salary, colspan, currencyCode}
){

  // open More Info Handler
  const [isOpen, setIsOpen] = useState(false);
  function openMoreInfoHandler() {
    if(isOpen) return setIsOpen(false)
    setIsOpen(true)
  }

  return (
    <>
    <tr className="bg-focusClr border-b border-mainClr">
      {no ? <TableData data={no} /> : ""}
      {cellId ? <TableData data={id} /> : ""}
      {cellName ? <TableData data={fullName} /> : ""}
      {cellEmail ? <TableData data={email} /> : ""}
      {cellPhone ? <TableData data={phone} /> : ""}
      {cellProfession ? <TableData data={profession} /> : ""}
      {cellSalary ? <TableData data={`${salary} ${currencyCode}`} /> : ""}
      {cellSkill ? <TableData data={skills} /> : ""}
      {cellPass ? <TableData data={password} /> : ""}
      {titleMoreInfo ? <td onClick={openMoreInfoHandler} className="p-2 w-52 bg-focusClr2 hover:text-focusClr cursor-pointer" >
        <div className="flex justify-between items-center">
          <span className="text-white">More Info</span>
          <span>{!isOpen ? <FaCaretDown className="fill-white"/> : <FaCaretUp className="fill-white"/>}</span>
          </div>
      </td> : ""}
    </tr>
    {isOpen ? 
    <tr>
      <td colSpan={colspan} >
        <div className="text-lg flex flex-col bg-focusClr2 p-2">
          <>
          <FullInfoTableData title="Full Name" value={fullName}/>
          <FullInfoTableData title="Email" value={email}/>
          <FullInfoTableData title="Phone" value={phone}/>
          <FullInfoTableData title="Profession" value={profession}/>
          <FullInfoTableData title="Salary" value={`${salary} ${currencyCode}`}/>
          <FullInfoTableData title="Skills" value={skills}/>
          <FullInfoTableData title="User Id" value={id}/>
          <FullInfoTableData title="Password" value={password}/>
          </> 
        </div>
      </td>
    </tr> : "" }
  </>
  )
}




// Task Row
function TaskInfoTabeRow({no, id, fullName, profession, status, customCls, taskDetail, selectEmployee}) {
   // open More Info Handler
  const [isOpen, setIsOpen] = useState(false);
  function openMoreInfoHandler() {
    if(isOpen) return setIsOpen(false)
    setIsOpen(true)
  }

  return (
    <>
      <tr className="bg-focusClr border-b border-mainClr">
        <TableData data={no} />
        <TableData data={id} />
        <TableData data={fullName} />
        <TableData data={profession} />
        <TableData data={status} customCls={customCls}/>
        <td onClick={openMoreInfoHandler} className="p-2 w-52 bg-focusClr2 hover:text-focusClr cursor-pointer" >
          <div className="flex justify-between items-center">
            <span className="text-white">Task Details</span>
            <span>{!isOpen ? <FaCaretDown className="fill-white"/> : <FaCaretUp className="fill-white"/>}</span>
          </div>
        </td>
      </tr>
      {isOpen ? <tr>
        <td colSpan={6} >
          <div className="bg-focusClr2 p-2">
            {taskDetail.map((list, idx) => {
              return <FullInfoTableData selectEmployee={selectEmployee} selectTask={list} key={idx} taskDetail={true} status={list.status} endDate={list.endDate} title="Task" value={list.task}/>
            })}
          </div>
        </td>
      </tr> : ""} 
    </>
  )
}
// Task Info
function TaskInfo({empList}){

  const [taskData, settaskData] = useState([]);
  useEffect(() => {
    const selectedData = empList.filter((emp) => {
      return emp.taskInfo;
    });
    settaskData(selectedData)
  }, [empList]);

  return (
  <>
    {taskData.length != 0 ? 
    <table className="w-full">
      <tbody>
        <tr className="bg-mainClr">
          <Heading title="No" customClass="w-10"/>
          <Heading title="user ID"/>
          <Heading title="full name"/>
          <Heading title="profession"/>
          <Heading title="status"/>
          <Heading title="task"/>
        </tr>

        {
          taskData.map((emp, idx) => {
            const taskDetail = emp.taskInfo.filter((list) => {
              if(list.status == "pending") return list;
              if(list.status == "queue") return list;
              if(list.status == "success") return list;   
            })
             return <TaskInfoTabeRow selectEmployee={emp} customCls="text-blue-500" key={emp.auth.id} no={idx+1} id={emp.auth.id} fullName={emp.fullName} profession={emp.profession} status="Check Status ➔" taskDetail={taskDetail}/>
          })
        }
      </tbody>
    </table> : <span className="text-orange-500 font-bold">No Task Yet !</span>}
  </>
  )
}





// Main Component
function  EmployeeTable({
  titleNo,
  titleId,
  titleName,
  titleEmail,
  titlePhone,
  titleSalary,
  titleProfession,
  titlePass,
  titleSkill,
  titleMoreInfo,

  colspan,

  cellId,
  cellName,
  cellEmail,
  cellPhone,
  cellSalary,
  cellSkill,
  cellProfession,
  cellPass,

  taskInfo
}) {


  // Context API
  const {currencyCode} = useGlobalContext();
  // Custom Hook
  const {empList} = useEmplyeeContext()
  return (
  <>
  {!taskInfo ? <table className="w-full">
    <tbody>
      <tr className="bg-mainClr">
        {(titleNo) ? <Heading title="No" customClass="w-10"/> : ""}
        {(titleId) ? <Heading title="User ID"/> : ""}
        {(titleName) ? <Heading title="Full Name"/> : ""}
        {(titleEmail) ? <Heading title="Email"/> : ""}
        {(titlePhone) ? <Heading title="Phone"/> : ""}
        {(titleProfession) ? <Heading title="Profession"/> : ""}
        {(titleSalary) ? <Heading title={`Salary ${currencyCode}`}/> : ""}
        {(titleSkill) ? <Heading title="Skills"/> : ""}
        {(titlePass) ? <Heading title="Password"/> : ""}
        {(titleMoreInfo) ? <Heading title="Full Info"/> : ""}
      </tr>
      {empList ? empList.map((emp, idx) => (
      <TableRow 
        key={emp.auth.id}
        cellId={cellId}
        cellName={cellName}
        cellEmail={cellEmail}
        cellPhone={cellPhone}
        cellSalary={cellSalary}
        cellProfession={cellProfession}
        cellPass={cellPass}
        cellSkill={cellSkill}
        titleMoreInfo={titleMoreInfo}

        colspan={colspan}
        currencyCode={currencyCode}

        no={idx+1}
        id={emp.auth.id}
        fullName={emp.fullName}
        email={emp.email}
        profession={emp.profession}
        skills={emp.skills}
        salary={emp.salary}
        phone={emp.phone}
        password={emp.auth.password}
      />  
      )) : ""}
      
      
    </tbody>
  </table> : <TaskInfo empList={empList}/>}
  </>
  )
}


export default EmployeeTable;