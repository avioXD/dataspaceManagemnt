import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export default function AllFaculty() {
  const tablesStructure: Columns[] = [
    {
      data_name: "name",
      header: "Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "email",
      header: "EmailID",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "contact_no",
      header: "Contact",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    // {
    //   data_name: "course_name",
    //   header: "Course",
    //   sortable: true,
    //   dataFilter: (data: any, key: any) => data[key] || <></>,
    // },
    {
      data_name: "mode",
      header: "Mode",
      sortable: true,
      dataFilter: (data: any, key: any) => {
        if (data[key] == 1) return <div className="text-success">online</div>;
        if (data[key] == 2) return <div className="text-danger">offline</div>;
        if (data[key] == 3)
          return <div className="text-info">online & offline</div>;
        return <div className="text-gray">Not Specified</div>;
      },
    },
    {
      data_name: "designation",
      header: "Designation",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "operation",
      header: "Operation",
      sortable: false,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <Link to="Set Faculty Timing" state={data.user_id}>
              <Button className="p-button-danger p-1" aria-label="Youtube">
                <i className="pi pi-clock "></i>
                <span className="px-1">Schedule</span>
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const { allFaculty } = globalDataStore();
  const { getAllFaculty } = protectedApiService();
  const [allData, setAllData] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (allFaculty?.length) {
      setAllData(allFaculty);
    } else {
      getFromApi();
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllFaculty();
    //console.log(res);
    setAllData(res);
  };
  return (
    <>
      <div className="das-exs ">
        <div className="flex-end mx-4">
          <Link to="Add Faculty">
            <button className="btn btn-primary">Add Faculty</button>
          </Link>
        </div>
      </div>
      <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All Faculty"}
        isForStudent
        onRefresh={getFromApi}
        message
        options
      />
    </>
  );
}
