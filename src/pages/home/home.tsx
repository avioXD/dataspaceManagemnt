import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../panels/navbar";
import Sidebar from "../../panels/sidebar";
import React, { useEffect, useState } from "react";
import userState from "../../store/_userState";
import protectedApiService from "../../services/_protected_api";
export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);
  const [f_path, setFPath] = useState("");
  const [p_path, setPPath] = useState("");
  let locationPath: any = location.pathname.replaceAll("%20", " ").split("/");
  let final_path = "";
  locationPath.forEach((element: any, index: any) => {
    if (locationPath.length - 1 != index && element) {
      if (index == 0) {
        final_path += element;
      } else {
        final_path += element + " > ";
      }
    }
  });

  const { accessToken } = userState();
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="portal-board ">
          <div className="header">
            <h4 className="user-type">Admin</h4>
            <span className="breadcrumb">
              {/* <a href="">Home </a> */}

              <a href="#" className="text-capitalize">
                <Link to={location.pathname} className="text-link">
                  {final_path}{" "}
                  {
                    <span className="active">
                      {locationPath[locationPath.length - 1]}
                    </span>
                  }
                  {/* {location.pathname.replaceAll("/", " > ")} */}
                </Link>
              </a>
            </span>
          </div>
          <div className="body mb-4">{accessToken && <Outlet />}</div>
        </div>
      </div>
    </>
  );
}
