import React, { useState, useEffect } from "react";
import $ from "jquery";
import { FiCode, FiBookOpen } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";
import { routings } from "../main_router";

export default function Sidebar(props: any) {
  const [togglerShow, setTogglerShow] = useState(false);

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

  const RenderLi = ({ elements, sub, parentPath }: any) => {
    return elements.map((ele: any) => (
      <>
        {" "}
        {ele.path ? (
          <li id={`li${ele.path}`} className="list-item">
            {ele.children.length ? (
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
                    {ele.icon ? <>{ele.icon}</> : "0"}
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
                    {ele.icon ? <>{ele.icon}</> : "0"}
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

  return (
    <>
      <div className="sidebar" data-aos="fade-right" data-aos-duration="1000">
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
              <RenderLi elements={routings[0].children} sub={0} />
              {/* <li className="list">
                <a
                  href="#submenu1"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="drop list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-start align-items-center">
                    <FiCode className="icon" />
                    <span className="mx-2">Self Learning</span>
                    <span className="submenu-icon ml-auto"></span>
                  </div>
                </a>
                <div id="submenu1" className="collapse sidebar-submenu">
                  <Link
                    to="/students"
                    className="sub list-group-item list-group-item-action text-white"
                  >
                    {" "}
                    <div className="menu-collapsed">
                      {" "}
                      <FiBookOpen className="icon " />
                      <span>Students all</span>
                    </div>
                  </Link>
                </div>
              </li>
              <li className="list">
                <Link
                  to="/faculty"
                  aria-expanded="false"
                  className="drop list-group-item list-group-item-action flex-column align-items-start"
                >
                  <AiOutlineSchedule className="icon" />
                  <span className="menu-collapsed">Scheduled Class</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
