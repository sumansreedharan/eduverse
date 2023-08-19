import { useLocation, Navigate, Outlet } from 'react-router-dom';


function AdminAuth({ logged }){
  const mentor = localStorage.getItem('token')
  
  const location = useLocation();
  return (
    logged ? (
      mentor ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
    ) : (
      user ? <Navigate to='/adminHome' state={{ from: location }} replace /> : <Outlet />
    )
  );
}

export default AdminAuth