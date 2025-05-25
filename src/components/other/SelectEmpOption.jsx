import useEmplyeeContext from "../../context/employeeContext"

function SelectEmpOption(){
  const {empList} = useEmplyeeContext()
  return (
    <datalist id="selectEmployee">
      {empList.map(empOption => (  
        <option key={empOption.auth.id} value={empOption.auth.id}>{empOption.fullName?.toLowerCase()}</option>
      ))}
    </datalist>
  )
}

export default SelectEmpOption;