import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";



function UserAuth({ logged }) {
  const user = localStorage.getItem('token')
  const userDetails = useSelector(state => state.loggedUser.currentUser);
  const location = useLocation();
  return (
    logged ? (
      user ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    ) : (
      user ? <Navigate to={`/${userDetails.role}/${userDetails.role}Home`} state={{ from: location }} replace /> : <Outlet />
    )
  );
}

export default UserAuth