import { ToastContainer, toast, Bounce } from 'react-toastify';


export const notifySuccess = (msg) => {
  toast.success(`${msg} !`, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
  });
}

export const notifyError = (msg) => {
  toast.error(`${msg} !`, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
  });
}

export const notifyWarn = (msg) => {
  toast.warn(`${msg} !`, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
  });
}


function Toastify() {
  return (
  <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      limit={5}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
  />)
}

export default Toastify;