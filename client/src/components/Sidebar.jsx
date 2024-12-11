import eventiumLogo from '../assets/eventium1.png';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  
  // This effect will automatically set `expanded` to false on smaller screens (mobile view).
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false); // Set sidebar to collapsed on smaller screens
      } else {
        setExpanded(true); // Reset to expanded on larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial check for the screen size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside className={`h-screen`}>
      <nav className="h-full bg-white flex flex-col border-r shadow-sm">
        <div className='flex justify-between items-center w-full pt-2'>
          <img src={eventiumLogo} alt="Eventium" className={`overflow-hidden transition-all ${expanded ? "w-20" : "w-0"}`} style={{ margin: '0 auto' }} />
          
          {/* Arrow button will only show on larger screens */}
          <button className={`h-[30px] p-3 ${expanded ? '' : 'hidden'} md:block`} onClick={() => setExpanded((current) => !current)}>
            {expanded ? <FiArrowLeft /> : <FiArrowRight />}
          </button>
        </div>

        {/* Using context to pass the expanded variable value to the children component */}
        <sidebarContext.Provider value={{ expanded }}>
          <ul className= {`flex-1 ${expanded ? 'px-3' : 'px-1' } mt-3`}>
            {children}
          </ul>
        </sidebarContext.Provider>

        <div className='border-t flex p-3 flex-col'>
          <CgProfile />
          <div className={`flex flex-col justify-center text-center ${expanded ? "w-[100%]" : "hidden"}`}>
            <div className='flex justify-between text-center my-2'>
              <span className='font-semibold text-sm'>Logged in User</span>
              <button><RiLogoutCircleFill /></button>
            </div>
            <span className='font-semibold text-sm text-gray-500'>hashirkhattak123@gmail.com</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

export function SidebarItems({ icon, text, active, alert }) {
  const { expanded } = useContext(sidebarContext);
  const navigate = useNavigate();

  function clickHander() {
    const pageLink = text.toLowerCase();
    navigate(`/${pageLink}`);
  }

  return (
    <li
      className={`relative flex items-center py-2 flex-1 ${expanded ? 'px-3' : 'px-1' } mt-3  my-1 font-medium rounded-md cursor-pointer transition-colors group 
      ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}
      onClick={clickHander}
    >
      <span>{icon}</span>
      <span className={`${expanded ? "w-52 ml-3" : "hidden"}`}>{text}</span>

      {/* Alert icon (if applicable) */}
      {alert && expanded && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />
      )}

      {/* Tooltip for collapsed state */}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
