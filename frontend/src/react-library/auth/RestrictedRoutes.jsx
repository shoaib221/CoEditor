import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context";
import { Loading } from "../miscel/Loading";


export const ForbiddenAccess = () => {

    return (
        <div className="cen-ver">
            <div className="text-xl" >403</div>
            <div>Forbidden Access</div>
        </div>
    )
}



export const PrivateRoute = ({ children }) => {
    
    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) return <Loading />;
    else if (!user) return <Navigate to='/auth' state={location?.pathname} />;
    else return children;
}


export const AdminRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const location = useLocation();

    // 1️⃣ Still loading Firebase OR loading user.role
    if (loading) return <Loading />;

    // 2️⃣ If not logged in → redirect to auth
    if (!user) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
    }

    // 3️⃣ If user is admin → allow route
    if (user.role === "admin") {
        return children;
    }

    // 4️⃣ Logged in but not admin → forbidden page
    return <ForbiddenAccess />;
};
