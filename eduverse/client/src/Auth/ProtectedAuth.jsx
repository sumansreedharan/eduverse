import {useSelector} from 'react-redux'
import {Navigate,Outlet,useLocation} from 'react-router-dom'


function ProtectedAuth(){
    const userDetails = useSelector((state)=>state.loggedUser.currentUser)
    const token = localStorage.getItem('token')
    const location = useLocation()
    
    if(!token){
        return <Outlet />
    }else{
        if(userDetails.role === 'user'){
            return <Navigate to="/userHome" state={{from: location}} replace />
        } else if(userDetails.role === 'admin'){
            return <Navigate to="/admin/adminHome" state={{from: location}} replace />
        }else if(userDetails.role==='mentor'){
            return <Navigate to="/mentor/mentorHome" state={{from: location}} replace />
        }
        
    }
}

export default ProtectedAuth