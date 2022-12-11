import { VscBellDot } from "react-icons/vsc";
import userState from "../store/_userState";

export default function Navbar() {
  const { user } = userState();
  return (
    <div className="container-fluid">
      <div className="nav flex-between ">
        <img className="logo" src="/assets/svg/Logo.svg" alt="" />
        <div className="nav-items">
          <div className="flex-end">
            <VscBellDot size={27} />
            <div className="avater mx-3">
              <img src="/assets/bg/register_bg.png" alt="" />
            </div>
            <div className="user">
              <span>
                {user?.username}
                <br /> Admin
              </span>
            </div>
            {/* <div className="arrow-dropdown">img</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
