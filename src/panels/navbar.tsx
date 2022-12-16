import { useEffect } from "react";
import { HiBell } from "react-icons/hi";
import { TbEye } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/_auth";

import userState from "../store/_userState";

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
        <img className="logo" src="/assets/svg/Logo.svg" alt="" />
        <div className="nav-items">
          <div
            className="flex-end right-side"
            style={{ marginRight: "2.8rem" }}
          >
            <HiBell size={27} />
            <div className="avater mx-3">
              <img src="/assets/bg/register_bg.png" alt="" />
            </div>
            <div className="user">
              <span>
                <h6>{user?.username}</h6>
                Admin
              </span>
            </div>
            <div className="nav-dropdown">
              <div className="nav-menu">
                <button className="tbl-btn">
                  <img
                    className="press"
                    onClick={showMenu}
                    src="/assets/svg/more.svg"
                    alt="..."
                  />
                </button>
                <div id="dropDown" className="menu" onMouseLeave={removeMenu}>
                  {/* <button className="flex-start text-dark option">
                    <TbEye size={20} />
                    <span className="mx-3">View</span>
                  </button>
                  <button className="flex-start text-dark option">
                    <img src="/assets/svg/edit.svg" alt="" />
                    <span className="mx-3">Edit</span>
                  </button> */}
                  <button
                    onClick={logout}
                    className="flex-start text-danger option"
                  >
                    <img src="/assets/svg/trash.svg" alt="" />
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
