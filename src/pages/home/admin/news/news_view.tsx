import { Columns } from "../../../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";
import { RiDeleteBack2Line } from "react-icons/ri";
import { toast } from "react-toastify";
export default function NewsView() {
  const tablesStructure: Columns[] = [
    {
      data_name: "news_name",
      header: "Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "course_name",
      header: "Course Name",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "contact_no",
      header: "Publish Date",
      sortable: true,
      dataFilter: (data: any, key: any) => (
        <>
          {data["date"]} - {data["time"]}
        </>
      ),
    },
    {
      data_name: "operation",
      header: "Operation",
      sortable: true,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <button
              onClick={() => deleteNews(data)}
              className="btn btn-outline-danger btn-sm"
            >
              <RiDeleteBack2Line />{" "}
            </button>
          </>
        );
      },
    },
  ];

  const { getAllNews, deleteOneNews } = protectedApiService();
  const deleteNews = (data: any) => {
    const res: any = deleteOneNews(data.news_id);
    getFromApi();
  };
  const [allData, setAllData] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    getFromApi();
  };
  const getFromApi = async () => {
    const res: any = await getAllNews();
    setAllData(res);
  };
  return (
    <>
      <div className="das-exs  ">
        <div className="flex-end mx-4">
          <Link to="/Home/Add News">
            <button className="btn btn-primary">Add News</button>
          </Link>
        </div>
      </div>
      <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All News Data"}
        isForStudent
        onRefresh={getFromApi}
        remove
      />
    </>
  );
}
