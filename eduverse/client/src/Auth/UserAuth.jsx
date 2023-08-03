import {useSelector} from 'react-redux'
import {Navigate,Outlet, useLocation} from 'react-router-dom'

function UserAuth() {
    const userToken = localStorage.getItem('token')
    const userDetails = useSelector((state) => state.loggedUser.currentUser);
    const location = useLocation();
    return(
        userToken && userDetails.role === 'user' ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    )
}
export default UserAuth;