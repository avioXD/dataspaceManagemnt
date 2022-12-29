import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";

export default function AllSales() {
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
  ];
  const { allSales } = globalDataStore();
  const { getAllSales } = protectedApiService();
  const [allData, setAllData] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (allSales?.length) {
      setAllData(allSales);
    } else {
      getFromApi();
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllSales();
    setAllData(res);
  };
  return (
    <>
      <div className="das-exs ">
        <div className="flex-end mx-4">
          <Link to="/Home/Add Sales">
            <button className="btn btn-primary">Add Sales</button>
          </Link>
        </div>
      </div>
      <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All Sales Team"}
        isForStudent
        onRefresh={getFromApi}
        message
      />
    </>
  );
}
