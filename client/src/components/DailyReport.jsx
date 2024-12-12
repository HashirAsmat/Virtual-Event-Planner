
import { FaComments, FaChartLine } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsKanban } from "react-icons/bs";

const DailyReport = () => {
  return (
     <div className="p-6 bg-white rounded-lg shadow-md">
         <header className="flex justify-between items-center border-b pb-4 mb-6">
           <div>
             <h1 className="text-xl font-bold text-gray-800">Tasks Report</h1>
             <p className="text-gray-600 text-sm">
               Stay on top of your tasks, monitor progress, and track status. Streamline your workflow and transform how you deliver results.
             </p>
           </div>
           <div className="flex items-center space-x-4">
             <button className="text-gray-500 hover:text-gray-700">
               Manage
             </button>
             <button className="text-gray-500 hover:text-gray-700">
               Share
             </button>
             <button className="px-4 py-2 bg-[#3C3C3C] text-white rounded-lg hover:bg-[#272727]">
               Create Task
             </button>
           </div>
         </header>
   
         <div className="grid grid-cols-4 gap-6">
           {/* Task Status */}
           <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-col space-y-3">
             <div className="flex justify-between items-center">
               <h2 className="text-sm font-semibold text-gray-800">Task Status</h2>
               <BsKanban className="text-gray-400 text-lg" />
             </div>
             <div className="flex space-x-6">
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-gray-800">24</h3>
                 <p className="text-sm text-gray-600">Backlog</p>
               </div>
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-gray-800">4</h3>
                 <p className="text-sm text-gray-600">In Progress</p>
               </div>
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-gray-800">7</h3>
                 <p className="text-sm text-gray-600">Validation</p>
               </div>
             </div>
           </div>
   
           {/* Comments */}
           <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-col space-y-3">
             <div className="flex justify-between items-center">
               <h2 className="text-sm font-semibold text-gray-800">Comments</h2>
               <FaComments className="text-gray-400 text-lg" />
             </div>
             <div className="flex justify-between items-center">
               <h3 className="text-2xl font-bold text-gray-800">109</h3>
               <p className="text-sm text-red-600">↓ 10.2% (7d)</p>
             </div>
           </div>
   
           {/* Commits */}
           <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-col space-y-3">
             <div className="flex justify-between items-center">
               <h2 className="text-sm font-semibold text-gray-800">Commits</h2>
               <FaChartLine className="text-gray-400 text-lg" />
             </div>
             <div className="flex justify-between items-center">
               <h3 className="text-2xl font-bold text-gray-800">27</h3>
               <p className="text-sm text-green-600">↑ 2.9% (7d)</p>
             </div>
           </div>
   
           {/* Burndown Chart */}
           <div className="p-4 bg-gray-50 rounded-lg shadow flex flex-col space-y-3">
             <div className="flex justify-between items-center">
               <h2 className="text-sm font-semibold text-gray-800">Burndown Chart</h2>
               <FiUsers className="text-gray-400 text-lg" />
             </div>
             <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
               <span className="text-gray-500 text-sm">Graph Placeholder</span>
             </div>
           </div>
         </div>
       </div>
  )
}

export default DailyReport;