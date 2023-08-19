import { useLocation, Navigate, Outlet } from 'react-router-dom';


function MentorAuth({ logged }){
  const mentor = localStorage.getItem('token')
  const location = useLocation();
  return (
    logged ? (
      mentor ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    ) : (
      user ? <Navigate to='/mentorHome' state={{ from: location }} replace /> : <Outlet />
    )
  );
}

export default MentorAuth