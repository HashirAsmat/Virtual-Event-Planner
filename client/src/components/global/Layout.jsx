import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom';
import { SidebarItems } from '../Sidebar';
import { FaHome , FaProjectDiagram } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { GoStack } from "react-icons/go";
import { FiFlag } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";

const Layout = () => {
  return (
   
    <div className="flex">
      <Sidebar>
      <SidebarItems icon={<FaHome/>} text={'Home'} alert />
      <SidebarItems icon={<FaProjectDiagram/>} text={'Projects'}  />
      <SidebarItems icon={<SlCalender/>} text={'Calender'}  />
      <SidebarItems icon={<GoStack/>} text={'Tasks'}  />
      <SidebarItems icon={<FiFlag/>} text={'Reporting'}  />
      <hr className='my-3'/>
      <SidebarItems icon={<IoSettingsOutline/>} text={'Settings'}  />
      <SidebarItems icon={<IoMdHelpCircleOutline/>} text={'Help'}  />
      </Sidebar>
          {/* Sidebar is always visible */}
          <div className={`flex-grow`}>
        <Outlet />  {/* Child route content is rendered here */}
      </div>
    </div>
  );
};

export default Layout;


