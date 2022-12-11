import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../common/data_table";
import PrimeDataTable from "../../../common/prime_data_table";
import { Columns } from "../../../interfaces/_common";
import protectedApiService from "../../../services/_protected_api";
import globalDataStore from "../../../store/_globalData";
export default function EditAdmin() {
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
      data_name: "designation",
      header: "Designation",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
  ];
  const emtarr: any[] = [];
  const { allAdmins } = globalDataStore();
  const { getAllAdmins } = protectedApiService();
  const [allData, setAllData] = useState(emtarr);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (allAdmins) {
      setAllData(allAdmins?.length ? allAdmins : null);
    } else {
      getFromApi();
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllAdmins();
    setAllData(res?.length ? res : null);
  };
  return (
    <>
      <div className="das-exs p-3">
        <div className="flex-end mx-4">
          <Link to="/Add Admins">
            <button className="btn btn-primary">Add Admin</button>
          </Link>
        </div>
      </div>

      <PrimeDataTable
        data={allData}
        structure={tablesStructure}
        title={"All Admins"}
        isForStudent
        onRefresh={getFromApi}
      />
    </>
  );
}
