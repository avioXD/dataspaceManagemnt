import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

export default function ViewAllJobs() {
  const tablesStructure: Columns[] = [
    {
      data_name: "title",
      header: "Jobs",
      sortable: true,
      dataFilter: (data: any, key: any) =>
        (
          <>
            <span className="limited-char">{data[key]}</span>
          </>
        ) || <></>,
    },
    {
      data_name: "company",
      header: "Company",
      sortable: true,
      dataFilter: (data: any, key: any) =>
        (
          <>
            <span className="limited-char">{data[key]}</span>
          </>
        ) || <></>,
    },
    {
      data_name: "job_role",
      header: "Role",
      sortable: true,
      dataFilter: (data: any, key: any) =>
        (
          <>
            <span className="limited-char">{data[key]}</span>
          </>
        ) || <></>,
    },
    {
      data_name: "operation",
      header: "Operation",
      sortable: false,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <Link to="/Home/Career/Edit Jobs" state={data}>
              <Button
                icon="pi pi-file-edit"
                className="p-button-rounded p-button-primary p-button-outlined"
                aria-label="Delete"
              />
            </Link>
            <Button
              onClick={() => deleteOneJob(data)}
              icon="pi pi-trash
                "
              className="mx-2 p-button-rounded p-button-danger p-button-outlined"
              aria-label="Delete"
            />
          </>
        );
      },
    },
  ];
  const { getJobsAll, deleteJob } = protectedApiService();
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const deleteOneJob = async (data: any) => {
    const res: any = await deleteJob(data.job_id);
    getFromApi();
    toast.success("Deleted!");
  };
  const getData = async () => {
    getFromApi();
  };
  const getFromApi = async () => {
    const res: any = await getJobsAll();
    console.log(res);
    setAllData(res);
  };
  return (
    <>
      <div className="das-exs ">
        <div className="flex-end mx-4">
          <Link to="/Home/Career/Add Jobs">
            <button className="btn btn-primary">Add Jobs</button>
          </Link>
        </div>
      </div>
      <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All Jobs"}
        onRefresh={getFromApi}
      />
    </>
  );
}
