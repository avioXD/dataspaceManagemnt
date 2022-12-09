import { VscBellDot } from "react-icons/vsc";

export default function Navbar() {
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
                Suresh Thapa <br /> Admin
              </span>
            </div>
            <div className="arrow-dropdown">img</div>
          </div>
        </div>
      </div>
    </div>
  );
}
