import { useEffect, useState, useCallback } from "react";
import { HiBell } from "react-icons/hi";
import { TbEye } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/_auth";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RxTriangleDown } from "react-icons/rx";
import userState from "../store/_userState";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { BsBell } from "react-icons/bs";
import { FcSms, FcAdvertising } from "react-icons/fc";
import protectedApiService from "../services/_protected_api";
export default function Navbar() {
  const { user } = userState();
  const { logout } = AuthService();
  const { getNotifications, getMessages } = protectedApiService();
  const [notifications, setNotifications] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
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
  useEffect(() => {
    getNoti();
    geMsg();
  }, []);
  const getNoti = useCallback(async () => {
    const res: any = await getNotifications();
    setNotifications(res);
  }, [notifications]);
  const geMsg = useCallback(async () => {
    const res2: any = await getMessages();
    setMessages(res2);
  }, [messages]);
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
        <div className="nav-items   ">
          <div
            className="flex-end right-side"
            style={{ marginRight: "2.8rem" }}
          >
            <div className="header-notification mx-2 mt-2 navbar-item dropdown  ">
              {" "}
              <a
                className="navbar-nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="pi pi-bell mx-2 p-text-secondary p-overlay-badge"
                  style={{ fontSize: "1.3rem" }}
                >
                  <Badge value={notifications.length}></Badge>
                </i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="item-header">
                  <h6 className="item-title">
                    {notifications.length} Notifications
                  </h6>
                </div>
                <div className="item-content" id="head-notify">
                  <div className="notifications">
                    {notifications.length ? (
                      <>
                        {" "}
                        {notifications.map((e: any, i: any) => {
                          return (
                            <>
                              <div
                                className="n-item"
                                onClick={() => {
                                  // go_to_destination(e);
                                }}
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={i * 40 + 500}
                                data-aos-easing="linear"
                              >
                                <div className="header flex-start">
                                  <div className="d-flex align-item-center">
                                    <FcAdvertising className="icon mx-2" />
                                    <p className="mx-2"> notifications</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className=" schedule"> {e.date}</p>
                                  </div>
                                </div>
                                <div className="n-item-body">
                                  {/* <div className="card-title text-start  ">
                                    <FcLink
                                      className="link-btn "
                                      onClick={() => {
                                        go_to_destination(e);
                                      }}
                                    />
                                  </div> */}
                                  <div
                                    className="text-primary message mx-2"
                                    dangerouslySetInnerHTML={{
                                      __html: e.message,
                                      // .replaceAll(".", "<br/>")
                                      // .replaceAll("<b>", "<br/> <b>"),
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {/* <NotificationSkelton message="Notifications" /> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="messages mx-2 navbar-item  mt-2  dropdown header-messages">
              {" "}
              <a
                className="navbar-nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                {" "}
                <i
                  className="pi pi-envelope mx-3  p-text-secondary p-overlay-badge"
                  style={{ fontSize: "1.3rem" }}
                >
                  <Badge value={messages.length} severity="danger"></Badge>
                </i>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="item-header">
                  <h6 className="item-title">{messages.length} Messages</h6>
                </div>
                <div className="item-content">
                  {messages.length ? (
                    <>
                      {" "}
                      {messages.map((e: any, i: any) => {
                        return (
                          <>
                            <div
                              className={
                                e.is_seen ? "  item bg-off-white" : "item"
                              }
                              data-aos="fade-up"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration={i * 40 + 500}
                              data-aos-easing="linear"
                            >
                              <div className="header flex-start">
                                <div className="d-flex align-item-center">
                                  <FcSms className="icon mx-2" />
                                  <p className="mx-2">Messages</p>
                                </div>
                                <div className="d-flex">
                                  <p className=" schedule"> {e.date}</p>
                                </div>
                              </div>
                              <div className="n-item-body">
                                {/* <div className="card-title text-start  ">
                                    <FcLink
                                      className="link-btn "
                                      onClick={() => {
                                        go_to_destination(e);
                                      }}
                                    />
                                  </div> */}

                                <div
                                  className="notice-title"
                                  dangerouslySetInnerHTML={{
                                    __html: e.message,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>{/* <NotificationSkelton message="Messages" /> */}</>
                  )}
                </div>
              </div>
            </div>

            <div className="user-items flex-center">
              <div className="   ">
                <div className="avater ">
                  <img src="/assets/bg/register_bg.png" alt="" />
                </div>
              </div>
              <div className="nav-dropdown">
                <div className="nav-menu">
                  <button className="tbl-btn">
                    <RxTriangleDown size={22} onClick={showMenu} />
                  </button>
                  <div id="dropDown" className="menu" onMouseLeave={removeMenu}>
                    {!(user.role == 1) && (
                      <Link to="/Home/Profile" state={user}>
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
            </div>

            {/* <div className="arrow-dropdown">img</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
