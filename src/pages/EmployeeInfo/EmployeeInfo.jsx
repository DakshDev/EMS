import { useCallback, useEffect, useRef, useState } from "react"
import Toastify, {notifySuccess, notifyError, notifyWarn} from "../../thirdparty/toastify";
import SelectEmpOption from "../../components/other/SelectEmpOption"
import EmployeeTable from "../../components/other/EmployeeTable/EmployeeTable"
import useEmplyeeContext from "../../context/employeeContext";

function EmployeeInfo(){
  // Costom Hook
  const {empList, setEmpList} = useEmplyeeContext();
  // useRef
  const createEmployeeForm = useRef();
  const removeEmployeeForm = useRef();
  // useState
  const [employee, setEmployee] = useState([]);
  const [resetAfterCreateEmp, setResetAfterCreateEmp] = useState(false);
  const [resetAfterRemoveEmp, setResetAfterRemoveEmp] = useState(false);
  const [saveData, setSaveData] = useState(true);
  // Constant
  const storeEmployByName = "employees";
  const selectProfessionOption = ["Software Engineer", "Accountant", "Marketing Manager", "HR Officer", "Designer", "Data Analyst", "Technician"];

  // Local Storage 
  useEffect(() => { 
    if(localStorage.getItem(storeEmployByName) === null){
      localStorage.setItem(storeEmployByName, "[]")
    }
    const parseData = JSON.parse(localStorage.getItem(storeEmployByName));
    if(saveData){
      if(parseData.length !== 0){
        setEmployee(JSON.parse(localStorage.getItem(storeEmployByName)))
      }
      setSaveData(false);
    }else{
      localStorage.setItem(storeEmployByName, JSON.stringify(employee));
      setEmpList(employee)
    }
  }, [employee, saveData]);
  

  // Reset From After Save and Notify Client
  useEffect(() => {
      if(resetAfterCreateEmp){
        notifySuccess("Employ is Created");
        createEmployeeForm.current.reset();     
        setResetAfterCreateEmp(false);
      }
      if(resetAfterRemoveEmp){
        notifySuccess("Employ is Deleted");
        removeEmployeeForm.current.reset();
        setResetAfterRemoveEmp(false)
      }
  }, [resetAfterCreateEmp, resetAfterRemoveEmp])

  // Create Employee
  function  createEmployeeHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const profession = e.target.profession.value;
    const salary = e.target.salary.value;
    const skills = e.target.skills.value;
    const password = e.target.password.value;

    if(!(name && email && phone && profession && salary && skills && password)){
      notifyError("Fill The Field")
      return;
    }

    setEmployee( (prev) => [...prev, { fullName: name, email: email, phone: phone, profession: profession, salary: salary, skills: skills, auth: {id: Math.round(Date.now() / 2), password: password }}] );
    setResetAfterCreateEmp(true);
  }

  // Remove Employee
  function removeEmployeeHandler(e) {
    e.preventDefault();
    const {employeeId, employeePassword, reason} = e.target;
    if(employee.length == 0){
      notifyWarn("First Create Employee")
      return;
    }

    if(employeeId.value == "" && employeePassword.value == ""){
        return notifyError("Fill The Fields")
    }
    
    employee.map((emp, idx) => {
      if(emp.auth.id == employeeId.value && emp.auth.password == employeePassword.value){
        let updateData = employee.filter(employee => employee.auth.id != employeeId.value)             
        setEmployee(updateData)
        setResetAfterRemoveEmp(true);
      }else{
        if(employee.length == (idx + 1)){
          notifyWarn("Wrong Information")
        }
      }
    }) 
  }
  
  return (
    <>
    <div className="max-w-7xl w-full mx-auto flex flex-col gap-10">
      <div className="flex gap-5 justify-between ">
        {/* Create Employee */}
        <div className="w-1/2 flex flex-col gap-5 bg-focusClr p-8 rounded-md">
          <h1 className="text-xl font-bold text-focusClr2">Create Employee</h1>
          <form autoComplete="off" ref={createEmployeeForm} onSubmit={createEmployeeHandler} className="flex flex-col gap-2">
            <div><input type="text" name="name" placeholder="Enter Full Name"/></div>
            <div><input type="email" name="email" placeholder="Enter Email"/></div>
            <div><input type="number" name="phone" placeholder="Enter Phone Number"/></div>
            <div><input list="selectProfession" type="text" name="profession" placeholder="Enter Profession (e.g: Software Developer)"/></div>
            <div><input type="number"  name="salary" placeholder="Enter Salary"/></div>
            <div><input type="text"  name="password" placeholder="Enter Password"/></div>
            <div><textarea className="resize-y min-h-20 max-h-40" name="skills" placeholder="Enter Skills (e.g: html, css, js, etc.)"></textarea></div>
            <div><button type="submit" className="priButton">Create Employee</button></div>
          </form>
        </div>
        {/* Remove Employee */}
        <div className="w-1/2 flex flex-col gap-5 bg-focusClr p-8 rounded-md">
          <h1 className="text-xl font-bold text-focusClr2">Remove Employee</h1>
          <form autoComplete="off" ref={removeEmployeeForm} onSubmit={removeEmployeeHandler} className="flex flex-col gap-2">
            <div><input onClick={(e) => e.target.select()} list="selectEmployee" type="text" name="employeeId" placeholder="Select Employee by id" className="capitalize"/></div>
            <div><input type="text" name="employeePassword" placeholder="Enter Password"/></div>
            <div><textarea className="resize-y min-h-40 max-h-60" name="reason" placeholder="Give Reason to remove employee"></textarea></div>
            <div><button type="submit" className="warnButton">Remove Employee</button></div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-focusClr2">Employee List</h1>
        <div>
          {empList.length != 0 ? 
          <EmployeeTable
          titleNo={true}
          titleId={true}
          titleName={true}
          titleEmail={true}
          titlePhone={false}
          titleSalary={false}
          titleProfession={false}
          titlePass={false}
          titleSkill={false}
          titleMoreInfo={true}

          colspan={5}

          cellId={true}
          cellName={true}
          cellEmail={true}
          cellPhone={false}
          cellSalary={false}
          cellSkill={false}
          cellProfession={false}
          cellPass={false}
          /> : <span className="text-orange-500 font-bold">No Employees Yet !</span>}
        </div>
      </div>
    </div>
    {/* Data List Employee Name and ID */}
    <SelectEmpOption />
    {/* Data List Profession */}
    <datalist id="selectProfession">
      {selectProfessionOption.map(prof => (
        <option key={prof} value={prof}>{prof}</option>
      ))}
    </datalist>
    <Toastify/>
    </>
  )
}

export default EmployeeInfo