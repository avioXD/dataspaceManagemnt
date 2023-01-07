import { useEffect } from "react";
import { HiBell } from "react-icons/hi";
import { TbEye } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/_auth";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RxTriangleDown } from "react-icons/rx";
import userState from "../store/_userState";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
export default function Navbar() {
  const { user } = userState();
  const { logout } = AuthService();
  ////********************************** */
  const showMenu = () => {
    let menu: any =
      (document.getElementById("dropDown") as HTMLElement) || null;
    menu.style.display = "block";
  };
  const removeMenu = () => {
    let menu: any =
      (document.getElementById("dropDown") as HTMLElement) || null;
    menu.style.display = "none";
  };
  return (
    <div className="container-fluid">
      <div className="nav flex-between ">
        <div className="flex-start left-side">
          <img
            className="img-fluid  "
            src="/assets/img/menu@2x.png"
            width={35}
            height={35}
          />
          <img
            className="logo"
            style={{ marginLeft: "1rem" }}
            src="/assets/svg/Logo.svg"
            alt=""
          />
        </div>
        <div className="nav-items d-none d-lg-block">
          <div
            className="flex-end right-side"
            style={{ marginRight: "2.8rem" }}
          >
            <i
              className="pi pi-bell mx-2 p-text-secondary p-overlay-badge"
              style={{ fontSize: "1.3rem" }}
              onClick={showMenu}
            >
              <Badge value="2"></Badge>
            </i>
            <i
              className="pi pi-envelope mx-3  p-text-secondary p-overlay-badge"
              style={{ fontSize: "1.3rem" }}
            >
              <Badge severity="danger"></Badge>
            </i>
            <div className="user-items  mx-3">
              <div className="avater mx-3">
                <img src="/assets/bg/register_bg.png" alt="" />
              </div>
              {/* <div className="user">
                <h6>{user?.username}</h6>
                <span>Admin</span>
              </div> */}
            </div>

            <div className="nav-dropdown">
              <div className="nav-menu">
                <button className="tbl-btn">
                  <RxTriangleDown size={28} onClick={showMenu} />
                </button>
                <div id="dropDown" className="menu" onMouseLeave={removeMenu}>
                  {!(user.role == 1) && (
                    <Link to="View Profile" state={user}>
                      <button className="flex-start text-primary option">
                        <AiOutlineUser />
                        <span className="mx-3">Profile</span>
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex-start text-danger option"
                  >
                    <AiOutlineLogout />
                    <span className="mx-3">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="arrow-dropdown">img</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
