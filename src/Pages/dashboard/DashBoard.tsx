import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashBoardContent from "./DashBoardContent";
import DashBoardHeader from "./DashBoardHeader";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { GetFromLocalStorage } from "../../services/misc";
import { REFRESH_TOKEN } from "../../utils/contants";
import { renewLogin } from "../../store/reducers/user";
import Loader from "../../components/ui/loader";
import { dashboardMenu } from "../../store/reducers/dashboard";

const DashBoard: React.FC = () => {
    const { isLoggedIn, user } = useAppSelector(state => state.user);
    const { dashMenu } = useAppSelector(state => state.dashboard);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn) {
            //if not logged in, try to renew the login
            const refreshToken = GetFromLocalStorage(REFRESH_TOKEN);
            if (refreshToken) {
                dispatch(renewLogin({ refreshToken }));
            } else {
                //if no refresh token, navigate to login page
                navigate("/login",  { state: { from: location }});
            }
        }
        else{
            if(user)    
                dispatch(dashboardMenu({roles:user.roles}));
        }
    }, [user, isLoggedIn]);

    useEffect(() => {

    }, [dashMenu]);
    const name = "Nikhil Mahato";
    const role = "member";
    return (
        <>
        {
            isLoggedIn ? (
                <div className="flex flex-col justify-center items-center gap-5 pb-5 pt-5 ">
                    <h2>{name}, {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} of BNS</h2>
                    <DashBoardHeader menu={dashMenu}/>
                    <DashBoardContent />
                </div>
            )
            : <Loader />
        }
        </>
    );
}

export default DashBoard;