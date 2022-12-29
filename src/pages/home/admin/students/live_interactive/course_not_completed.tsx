import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Button } from "primereact/button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export default function CourseNotCompletedStudents() {
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
            <Button
              onClick={() => {
                setSelected(data);
                handleShow();
              }}
              className="p-button-success p-1"
              aria-label="Facebook"
            >
              <i className="pi pi-check p-1"></i>
              <span className="p-1">Completed</span>
            </Button>
          </>
        );
      },
    },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selected, setSelected] = useState<any>();
  const { getAllStudentsReminder, postUpdateCourseCompleteStatus } =
    protectedApiService();
  useEffect(() => {
    getData();
  }, []);
  const empt: any = [];
  const [allData, setAllData] = useState(empt);
  const getData = async () => {
    getFromApi();
  };
  const getFromApi = async () => {
    const res: any = await getAllStudentsReminder();
    let data: any[] = res;
    setAllData(data.length ? [...data] : []);
  };
  const onComplete = async () => {
    const res: any = await postUpdateCourseCompleteStatus(selected.user_id);
    if (res) {
      toast.success("Changed");
      handleClose();
      getFromApi();
    }
  };
  return (
    <>
      <PrimeDataTable
        data={allData}
        structure={tablesStructure}
        title={"Course Completed Reminder"}
        isForStudent
        onRefresh={getFromApi}
        note
        message
        timeline
        options
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div className="p-4">
          <h3 className="text-center">Are you sure?</h3>
          <div className="flex-center">
            <button onClick={handleClose} className="btn btn-sm btn-info mx-1">
              Close
            </button>
            <button onClick={onComplete} className="btn btn-sm btn-success">
              Completed
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
