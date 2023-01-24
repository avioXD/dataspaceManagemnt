import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Loader2 from "../../../../../common/loader2";
export default function CourseCompletedStudents() {
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
              <Button className="facebook p-1" aria-label="Facebook">
                <i className="pi pi-calendar-plus "></i>
                <span className="px-1">Set Another Class</span>
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

  const [allData, setAllData] = useState<any>(null);
  const getData = async () => {
    if (allStudents) {
      let data: any[] = allStudents.filter((x: any) => {
        if (x.course_completed) {
          return x;
        }
      });
      setAllData(data.length ? [...data] : []);
    } else {
      getFromApi();
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllStudents();
    let data: any[] = res.filter((x: any) => {
      if (x.course_completed) {
        return x;
      }
    });
    setAllData(data.length ? [...data] : []);
  };

  return (
    <>
      <>
        {!allData && <Loader2 />}
        {allData && (
          <PrimeDataTable
            data={allData}
            structure={tablesStructure}
            title={"Course Completed"}
            isForStudent
            onRefresh={getFromApi}
            note
            message
            timeline
            options
          />
        )}
      </>
    </>
  );
}
