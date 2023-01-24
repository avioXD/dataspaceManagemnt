import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader2 from "../../../../../common/loader2";
export default function ProjectAssignedStudents() {
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
  const { allStudents } = globalDataStore();
  const { getAllStudents, postUpdateProjectCompleteStatus } =
    protectedApiService();
  useEffect(() => {
    getData();
  }, []);
  const [allData, setAllData] = useState<any>(null);
  const getData = async () => {
    if (allStudents) {
      let data: any[] = allStudents.filter((x: any) => {
        if (x.project_assigned) {
          return x;
        }
      });
      setAllData(data.length ? [...data] : []);
    } else {
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllStudents();
    let data: any[] = res.filter((x: any) => {
      if (x.project_assigned && x.course_completed) {
        return x;
      }
    });
    setAllData(data.length ? [...data] : []);
  };
  const onComplete = async () => {
    const res: any = await postUpdateProjectCompleteStatus(selected.user_id);
    if (res) {
      toast.success("Moved To Interview");
      handleClose();
      getFromApi();
    }
  };

  return (
    <>
      {allData ? (
        <>
          <PrimeDataTable
            data={allData}
            structure={tablesStructure}
            title={"Project Assigned Students"}
            isForStudent
            onRefresh={getData}
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
                <button
                  onClick={handleClose}
                  className="btn btn-sm btn-info mx-1"
                >
                  Close
                </button>
                <button onClick={onComplete} className="btn btn-sm btn-success">
                  Completed
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <Loader2 />
      )}
    </>
  );
}
