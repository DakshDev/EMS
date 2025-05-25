import { useEffect, useRef, useState } from "react";
import SelectEmpOption from "../../components/other/SelectEmpOption"
import Toastify, {notifySuccess, notifyError} from "../../thirdparty/toastify"
// Context API
import useEmplyeeContext from "../../context/employeeContext"
import EmployeeTable from "../../components/other/EmployeeTable/EmployeeTable"


function EmployeeTask(){
  // Context API
  const {empList, setEmpList} = useEmplyeeContext();
  
  // useState
  const [displayProfession, setDisplayProfession] = useState("");
  const [resetAfterTaskCreated, setResetAfterTaskCreated] = useState(false);
  // useRef
  const createTaskForm = useRef();



  useEffect(() => {
    if(resetAfterTaskCreated){
      notifySuccess("Task is Created")
      createTaskForm.current.reset();
      setDisplayProfession("")
      setResetAfterTaskCreated(false)
    }
  }, [resetAfterTaskCreated])

  // Create Task Handler
  const [taskInfo, setTaskInfo] = useState([]);
  useEffect(() => {   
    if(taskInfo.length != 0){
      const delData = empList.filter(emp => {
        return emp.auth.id != taskInfo.auth.id;
      })
      const finalData = [...delData, taskInfo];
      setEmpList(finalData);
    }
  }, [taskInfo])
  function createTaskHandler(e) {
    e.preventDefault()
    const target = e.target;
    const id = target.id.value;
    const profession = target.profession.value;
    const endDate = target.endDate.value;
    const task = target.task.value;

    
    if(!(id && profession && endDate && task)){
      notifyError("Fill The Field")
    }else{
      empList.filter(emp => {
        if(emp.auth.id == id){
          if(emp.taskInfo){
            const rmList = empList.filter(list => emp.auth.id != list.auth.id)
            setEmpList(rmList)
            
            const newTask = {...emp, taskInfo: [...emp.taskInfo, {task: task, endDate: endDate, status: "pending", notifySeen: "false"}]};
            setTaskInfo(newTask);
            setResetAfterTaskCreated(true);
            return;
          }
          const addTaskInfo = {...emp, taskInfo: [{task: task, endDate: endDate, status: "pending", notifySeen: "false"}]};
          setTaskInfo(addTaskInfo)
          setResetAfterTaskCreated(true);
        }
      });
    }
  }
  
  // Suggest Profession
  function  suggestProfession(e) {
    const filteredData = empList.filter(emp => emp.auth.id == e.currentTarget.value)
    console.log(filteredData);
    if(filteredData[0] != undefined) return setDisplayProfession(filteredData[0].profession);
    setDisplayProfession("");
  }

  return (
    <>
    <div className="w-1/2 flex flex-col gap-5 bg-focusClr p-8 rounded-md">
      <h1 className="text-xl font-bold text-focusClr2">Create Task</h1>
      <form ref={createTaskForm} onSubmit={createTaskHandler} autoComplete="off" className="flex flex-col gap-2">
        <div><input onClick={(e) => e.target.select()} list="selectEmployee" type="text" name="id" onChange={suggestProfession} placeholder="Select Employee by id" className="capitalize"/></div>
        <div><input type="text" name="profession" placeholder="Profession" value={displayProfession} disabled className="bg-white"/></div>
        <div><input type="date" name="endDate" placeholder="End Date"/></div>
        <div><textarea className="resize-y min-h-40 max-h-60" name="task" placeholder="Write Task"></textarea></div>
        <div><button type="submit" className="priButton">Create Task</button></div>
      </form>
    </div>
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-focusClr2">Employee Task List</h1>
      <div>
        <EmployeeTable taskInfo={true}/>
      </div>
    </div>
    < SelectEmpOption />
    < Toastify />
   </>
  )
}

export default EmployeeTask