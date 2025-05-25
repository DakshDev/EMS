function BoxInfo({link, component, total, title, className, icon_className, onClick}){
  return (
    <div onClick={onClick} className={`w-3/12 p-6 rounded-md text-center flex flex-col gap-4 cursor-pointer ${className}`}>
      <div className="flex justify-center items-center">
        <span className={`p-2.5 rounded-full bg-focusClr`}>{component}</span>
        </div>
      <div>
        <h1 className="text-xl font-bold">{total}</h1>
        <h3 className="text-lg capitalize font-bold">{title}</h3>
      </div>
    </div>
  )
}


export default BoxInfo;