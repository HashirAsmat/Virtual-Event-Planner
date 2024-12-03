import { useNavigate } from "react-router-dom"

export const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col mx-auto w-[50%] items-center justify-center mt-60 gap-8">
        <h1>404 Page Not Found</h1>
        <button onClick={()=>{navigate('/login')}} className="bg-transparent hover:bg-[#B442B4] text-[#B442B4] font-semibold hover:text-white py-2 px-4 border border-[#B442B4] hover:border-transparent rounded">Login</button>
    </div>
  )
}
