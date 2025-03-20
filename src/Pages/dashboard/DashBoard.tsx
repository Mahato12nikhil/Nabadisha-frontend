import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashBoardContent from "./DashBoardContent";
import DashBoardHeader from "./DashBoardHeader";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { GetFromLocalStorage } from "../../services/misc";
import { REFRESH_TOKEN } from "../../utils/contants";
import { renewLogin } from "../../store/reducers/user";
import Loader from "../../components/ui/loader";
import { dashboardMenu } from "../../store/reducers/dashboard";
import { IUser } from "../../definitions/user";

export type SectionType="event" | "treasurer" | "admin";

const DashBoard: React.FC = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);
  const { dashMenu } = useAppSelector((state) => state.dashboard);
  const [currentSection, setCurrentSection] = useState<string>("event");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
        dispatch(dashboardMenu({ roles: user.roles }));
    } else {
       //if not logged in, try to renew the login
      const refreshToken = GetFromLocalStorage(REFRESH_TOKEN);
      if (refreshToken) {
        dispatch(renewLogin({ refreshToken }));
      } else {
        //if no refresh token, navigate to login page
        navigate("/login", { state: { from: location } });
      }
    }
  }, [user]);

  const updateSection=(section: string)=>{
    if(section)setCurrentSection(section);
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col justify-center items-center pb-5 pt-5 bg-accent">
          <ProfileSection user={user} />
          <DashBoardHeader menu={dashMenu} onClick={updateSection} section={currentSection}/>
          <DashBoardContent section={currentSection}/>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
const ProfileSection: React.FC<{ user: IUser | undefined }> = ({ user }) => {
  return (
    <div className="w-full flex flex-col items-center p-6 bg-accent">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="rounded-full border-4 border-white-300 shadow-sm shadow-gray-400">
            <img
              src={user?.userPic}
              alt="user"
              className="h-24 w-24 rounded-full shadow-inner"
            />
          </div>
        </div>
        <h1 className="mt-4 text-lg text-[color:var(--color-text)]">
          {user?.name}
        </h1>
      </div>

      {/* Socials & Other Details
      <div className="mt-4 flex gap-4">
        <i className="fab fa-facebook text-blue-600 text-xl"></i>
        <i className="fab fa-twitter text-blue-400 text-xl"></i>
        <i className="fab fa-linkedin text-blue-700 text-xl"></i>
        <i className="fab fa-instagram text-pink-500 text-xl"></i>
      </div> */}
    </div>
  );
};
export default DashBoard;
