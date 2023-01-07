import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";

export default function FacultyReport() {
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
      data_name: "total_courses",
      header: "Total Courses",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "total_class_completed",
      header: "Total Completed Classes",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "demo_taken",
      header: "Demo Taken",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },

    {
      data_name: "ratings",
      header: "Ratings",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
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
    setAllData(res);
  };
  return (
    <>
      <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All Faculty Report"}
        isForStudent
        onRefresh={getFromApi}
        message
        importable
      />
    </>
  );
}
