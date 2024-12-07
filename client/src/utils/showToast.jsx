import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type, closeStatus, btn) => {
  const toastContent = (
    <div className={btn ? `flex flex-col  justify-between` : ""}>
      <div>{message}</div>
      {btn && (
        <button
          className="w-12 p-1 mt-1 mr-0 text-xs text-red-300 border border-red-300 rounded-md"
          onClick={() => handleButtonClick()}
        >
          {btn}
        </button>
      )}
    </div>
  );
  toast[type](toastContent, {
    position: "top-center",
    closeButton: true,
    closeOnClick: false,
    draggable: false,
    draggablePercent: 0,
    autoClose: closeStatus === true ? 1000 : false,
    hideProgressBar: false,
    pauseOnHover: true,
  });
};

const handleButtonClick = () => {
  toast.dismiss();
};
