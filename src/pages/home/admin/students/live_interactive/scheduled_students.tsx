import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import Loader2 from "../../../../../common/loader2";

export default function ScheduledStudents() {
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
    {
      data_name: "course_name",
      header: "Course",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "operation",
      header: "Operation",
      sortable: true,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <Link to="/Home/Students/live/Set Student Class" state={data}>
              <Button className="p-btn-primary p-1" aria-label="Facebook">
                <i className="pi pi-calendar-plus p-1"></i>
                <span className="p-1">Set Class</span>
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const { allStudents } = globalDataStore();
  const { getAllStudents } = protectedApiService();
  useEffect(() => {
    getData();
  }, []);
  const empt: any = [];
  const [allData, setAllData] = useState(empt);
  const getData = async () => {
    getFromApi();
  };
  const getFromApi = async () => {
    const res: any = await getAllStudents();
    let data: any[] = res.filter((x: any) => {
      if (x.class_assigned) {
        return x;
      }
    });
    setAllData(data.length ? [...data] : []);
  };

  return (
    <>
      {allData ? (
        <PrimeDataTable
          data={allData}
          structure={tablesStructure}
          title={"Scheduled Students"}
          isForStudent
          onRefresh={getFromApi}
          note
          message
          timeline
          options
          view
        />
      ) : (
        <Loader2 />
      )}
    </>
  );
}
