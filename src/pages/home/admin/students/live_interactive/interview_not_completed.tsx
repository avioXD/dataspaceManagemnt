import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
export default function InterviewNotCompleted() {
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
            <button
              onClick={() => {}}
              className="btn btn-outline-primary btn-sm"
            >
              Change Status
            </button>
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
    if (allStudents) {
      let data: any[] = allStudents.filter((x: any) => {
        if (!x.interview) {
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
      if (!x.interview && x.project_assigned && x.course_completed) {
        return x;
      }
    });
    setAllData(data.length ? [...data] : []);
  };

  return (
    <>
      <PrimeDataTable
        data={allData}
        structure={tablesStructure}
        title={"Interview Not Completed"}
        isForStudent
        onRefresh={getFromApi}
        note
        message
        timeline
        options
      />
    </>
  );
}
