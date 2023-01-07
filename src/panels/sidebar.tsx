import React, { useState, useEffect } from "react";
import $ from "jquery";
import { FiCode, FiBookOpen } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { rootRouterPath } from "../routing/router_paths";
import userState from "../store/_userState";

export default function Sidebar(props: any) {
  const [togglerShow, setTogglerShow] = useState(true);
  const { user } = userState();
  useEffect(() => {
    doQuerry();
    runJquery();
  }, []);

  const doQuerry = () => {
    if (!$("#toggler").is(":checked")) {
      $(".list-item").css("width", "max-content");
      $(".route_name").css({ display: "none" });
      $(".sub-icon").css({ display: "none" });
    } else {
      $(".sub-icon").css({ display: "initial" });
      $(".route_name").css({ display: "flex" });
      $(".list-item").css("width", "100%");
    }
  };
  const runJquery = () => {
    $("#toggler").change(function () {
      doQuerry();
    });
  };

  const onExpand = (path: any) => {
    console.log();
    if ($(`#sub-${path}`).attr("aria-expanded") === "true") {
      $(`#li${path}`).css("background-color", "red");
    }
  };
  const { routings }: any = rootRouterPath();
  const RenderLi = ({ elements, sub, parentPath }: any) => {
    return elements.map((ele: any) => (
      <>
        {" "}
        {ele.shortcut && ele.path ? (
          <li id={`li${ele.path}`} className="list-item">
            {ele.children.length && ele?.collapse ? (
              <>
                <a
                  href={`#link-${ele.path}`}
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="link drop-link"
                  onClick={() => {
                    onExpand(ele.path);
                  }}
                  id={`#sub-${ele.path}`}
                >
                  <div className="cont">
                    {ele.icon ? <>{ele.icon}</> : <span className="dot"></span>}
                    <span className="route_name">{ele.route}</span>
                    <span className="sub-icon"></span>
                  </div>
                </a>
                <div
                  id={`link-${ele.path}`}
                  className="collapse sidebar-submenu"
                >
                  <RenderLi
                    elements={ele.children}
                    sub={1}
                    parentPath={
                      parentPath
                        ? parentPath + "/" + ele.path
                        : "/" + ele.path || ""
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  to={parentPath ? parentPath + "/" + ele.path : "/" + ele.path}
                  aria-expanded="false"
                  className={`link ${sub ? "bg-force" : ""}`}
                >
                  <div className="cont">
                    {" "}
                    {ele.icon ? <>{ele.icon}</> : <span className="dot"></span>}
                    <span className="route_name">{ele.route}</span>
                  </div>
                </Link>
              </>
            )}
          </li>
        ) : (
          <></>
        )}
      </>
    ));
  };
  let location: any = useLocation();
  console.log(location.pathname.split("/"));
  useEffect(() => {
    console.log("Paths", location.pathname.split("/"));
    console.log(
      routings.filter((x: any) => x.path == location.pathname.split("/")[1])
    );
    console.log("Routings ", routings);
  }, [location]);
  return (
    <>
      {routings !== undefined && (
        <>
          <div
            className="sidebar"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <input
              id="toggler"
              className="checkbox"
              type="checkbox"
              name="toggler"
              checked={togglerShow}
              onChange={() => setTogglerShow(!togglerShow)}
            />
            <div className="open-close">
              <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
              </div>{" "}
            </div>

            <div className="options d-flex flex-column ">
              <div className="s-menu">
                <ul className="list-group">
                  <RenderLi
                    elements={
                      routings.filter(
                        (x: any) => x.path == location.pathname.split("/")[1]
                      )[0]?.children
                    }
                    parentPath={`/${location.pathname.split("/")[1]}`}
                    sub={0}
                  />
                  {user?.role == "5" &&
                    location.pathname
                      .split("/")
                      [location.pathname.split("/").length - 1].replaceAll(
                        "%20",
                        ""
                      ) == "Dashboard" && (
                      <div className="only-dashboard flex-center flex-column">
                        <li className="list">
                          <img
                            className="sidebar-img"
                            src="/assets/student/referal.png"
                            alt=""
                          />
                        </li>
                        <button className="btn btn-primary btn-sm mx-auto">
                          Refer Now
                        </button>
                      </div>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
