import React, { useEffect, useState } from "react";
import { Columns } from "../../../interfaces/_common";
import protectedApiService from "../../../services/_protected_api";
import PrimeDataTable from "../../../common/prime_data_table";
import userState from "../../../store/_userState";
export default function Facultydashboard() {
  const { get_faculty_upcoming_classes } = protectedApiService();
  const { user } = userState();
  const [alldata, setalldata] = useState(null);

  const tablesStructure: Columns[] = [
    {
      data_name: "course_code",
      header: "Course Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "date",
      header: "Date",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "start_time",
      header: "Time",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
  ];

  useEffect(() => {
    get_faculty_upcoming_classe();
  }, []);

  const get_faculty_upcoming_classe = async () => {
    const get_data = await get_faculty_upcoming_classes(user.user_id);
    // console.log(get_data);
    setalldata(get_data);
  };

  return (
    <>
      {/* <h3>Upcoming Classes</h3> */}
      <div className="container">
        <div className="row">
          <div className="col-md-2 cust_sec">
            <div
              className="faculty_dash_card"
              style={{
                display: "flex",
                background: "#DFF1FF",
                padding: "10px 15px",
                margin: "10px 0",
              }}
            >
              <div>
                <img
                  src="/assets/img/Classes_Completed.png"
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div>
                <h3 style={{ color: "#0082C1", fontWeight: "bold" }}>04</h3>
                <p style={{ fontSize: "12px" }}>Class Completed</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 cust_sec">
            <div
              className="faculty_dash_card"
              style={{
                display: "flex",
                background: "#FFF9E1",
                padding: "10px 15px",
                margin: "10px 0",
              }}
            >
              <div>
                <img
                  src="/assets/img/Star.png"
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div>
                <h3 style={{ color: "#FDB230", fontWeight: "bold" }}>4.8</h3>
                <p style={{ fontSize: "12px" }}>Student Ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrimeDataTable
        data={alldata || []}
        structure={tablesStructure}
        title={"Upcoming Classes"}
        onRefresh={get_faculty_upcoming_classe}

        // options
      />
    </>
  );
}
