import useEmployeeContext from "../../context/employeeContext";
import useEmplyeeContext from "../../context/employeeContext";




function UserInfoBox({title, value}) {
  return (
    <div className="p-4 rounded-md bg-focusClr flex gap-2 items-center flex-shrink-0">
      <h1 className="text-xl font-bold text-mainClr capitalize">{title} : </h1>
      <h2 className="font-semibold text-xl text-focusClr2">{value}</h2>
    </div>
  )
}



function EmployeeDashboard() {

  const {setEmpList} = useEmplyeeContext();
  const {whoIsLogin, setWhoIsLogin} = useEmployeeContext();
  

  const completeTaskHandler = (whoIsLogin ,idx, taskMsg) => {
    let copy = JSON.parse(JSON.stringify(whoIsLogin))
    copy.taskInfo[idx].status = "queue"
    copy.taskInfo[idx].adminNotify = true;
    const rmList = whoIsLogin.taskInfo.filter(list => {
      return list.task != taskMsg
    })
    setWhoIsLogin(copy)
  }



  
    return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-focusClr2">My info regestered on Company</h1>
        <div className="flex gap-2 flex-wrap">
          <UserInfoBox title="ID" value={whoIsLogin.auth.id}/>
          <UserInfoBox title="name" value={whoIsLogin.fullName}/>
          <UserInfoBox title="email" value={whoIsLogin.email}/>
          <UserInfoBox title="phone" value={whoIsLogin.phone}/>
          <UserInfoBox title="profession" value={whoIsLogin.profession}/>
          <UserInfoBox title="salary" value={whoIsLogin.salary}/>
          <UserInfoBox title="skills" value={whoIsLogin.skills}/>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-focusClr2">My Task</h1>
        {whoIsLogin.taskInfo
        ? 
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="bg-mainClr p-2 text-focusClr w-20">No</td>
                <td className="bg-mainClr p-2 text-focusClr w-40">Status</td>
                <td className="bg-mainClr p-2 text-focusClr w-40">End Date</td>
                <td colSpan={2} className="bg-mainClr p-2 text-focusClr ">Task Message</td>
                </tr>
                {whoIsLogin.taskInfo.map((list, idx) => (
                <tr key={idx} className="border-b border-mainClr">
                  <td className="p-2 bg-focusClr capitalize">{idx+1}</td>
                  {list.status == "queue" ? <td className="p-2 bg-focusClr font-bold capitalize text-slate-700">{list.status}</td>: ""}
                  {list.status == "pending" ? <td className="p-2 bg-focusClr font-bold capitalize text-orange-500">{list.status}</td> : ""}
                  {list.status == "success" ? <td className="p-2 bg-focusClr font-bold capitalize text-emerald-500">{list.status}</td>: ""}
                  <td className="p-2 bg-focusClr capitalize">{list.endDate}</td>
                  <td className="p-2 bg-focusClr capitalize">{list.task}</td>
                  <td className="p-2 bg-focusClr capitalize flex justify-end">
                    {list.status == "queue" ? <span className="p-2 bg-focusClr2 rounded-md text-focusClr font-bold">Waiting For Admin Respond</span> : ""}
                    {list.status == "pending" ? <button onClick={() => completeTaskHandler(whoIsLogin, idx, list.task)} className="secButton">Mark as Completed</button> : ""}
                    {list.status == "success" ? <button className="bg-emerald-500 text-white p-2 rounded-md">Completed</button> : ""}
                    </td> 
                </tr>
                ))}
                
            </tbody>
          </table>
        </div>
        : 
        "No Task Yet"}
      </div>
    </div>
  )
}

export default EmployeeDashboard;