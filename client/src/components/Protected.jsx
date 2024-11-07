import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const Protected = ({isAuth,children}) => {
    if(isAuth){
        return children
    }
 else{
    return <Navigate to='/'/>
 }
}

export default Protected