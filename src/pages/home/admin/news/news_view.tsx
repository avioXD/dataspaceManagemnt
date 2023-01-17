import { Columns } from "../../../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";
import { RiDeleteBack2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";
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
              onClick={() => {
                setDeletable(data);
                handleShow();
              }}
              className="btn btn-outline-danger btn-sm"
            >
              <RiDeleteBack2Line />{" "}
            </button>
          </>
        );
      },
    },
  ];

  const [show, setShow] = useState(false);
  const [deletable, setDeletable] = useState<any>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onDelete = async () => {
    const res: any = await deleteOneNews(deletable.news_id);
    if (res) {
      toast.success("Deleted");
    }
    getFromApi();
  };

  const { getAllNews, deleteOneNews } = protectedApiService();

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
          <Link to="Add News">
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div className="p-4">
          <h5 className="text-center mb-4">Are you sure?</h5>
          <div className="flex-center">
            <button onClick={handleClose} className="btn btn-sm btn-info mx-1">
              Close
            </button>
            <button onClick={onDelete} className="btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
