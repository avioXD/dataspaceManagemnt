import { Columns } from "../../../../../interfaces/_common";
import globalDataStore from "../../../../../store/_globalData";
import React, { useCallback, useEffect, useState } from "react";
import protectedApiService from "../../../../../services/_protected_api";
import PrimeDataTable from "../../../../../common/prime_data_table";
import Modal from "react-bootstrap/Modal";
import SetFacultyTiming from "../../faculty/set_faculty_timing";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { data } from "jquery";
export default function ProjectNotAssignedStudents() {
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
      sortable: false,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            <Button
              onClick={() => {
                onValueChange(data);
                handleShow();
              }}
              className="p-button-info p-1"
            >
              <i className="pi pi-plus p-1"></i>
              <span className="px-1">Assign</span>
            </Button>
          </>
        );
      },
    },
  ];
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { allStudents, allFaculty } = globalDataStore();
  const { getAllStudents, getAllFaculty, postAssignProject } =
    protectedApiService();
  useEffect(() => {
    getData();
    getAllFacultyFromApi();
  }, []);
  const empt: any = [];
  const [allData, setAllData] = useState(empt);
  const getData = async () => {
    if (allStudents) {
      let data: any[] = allStudents.filter((x: any) => {
        if (!x.project_assigned && x.course_completed) {
          return x;
        }
      });
      setAllData(data.length ? [...data] : []);
    } else {
      getFromApi();
    }
  };
  const getAllFacultyFromApi = async () => {
    if (!allFaculty) {
      const res: any = await getAllFaculty();
    }
  };
  const getFromApi = async () => {
    const res: any = await getAllStudents();
    let data: any[] = res.filter((x: any) => {
      if (!x.project_assigned) {
        return x;
      }
    });
    setAllData(data.length ? [...data] : []);
  };
  const onValueChange = useCallback(
    (val: any) => {
      setFormData({ ...formData, ...val });
      // //console.log(val);
      // //console.log(formData);
    },
    [formData]
  );
  const onAssign = async () => {
    if (formData?.faculty_id) {
      const res: any = await postAssignProject(formData);
      if (res) {
        toast.success("Project Assigned");
        handleClose();
        getFromApi();
      } else {
        toast.error(res);
      }
    }
  };
  return (
    <>
      <PrimeDataTable
        data={allData}
        structure={tablesStructure}
        title={"Project Not Assigned Students"}
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
        <Modal.Header closeButton>
          <Modal.Title>Assign Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="mx-auto"
            style={{
              minWidth: "20rem",
            }}
          >
            <div className="mb-3">
              <p className="text-dark">
                Assign Project to :{" "}
                <span className="text-info">{data.name}</span>
              </p>
              <div className="flex-start flex-between ">
                <select
                  id="faculty_id"
                  name="faculty_id"
                  className="form-select  "
                  onChange={(e) =>
                    onValueChange({
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value={0} disabled selected hidden>
                    Select Faculty
                  </option>
                  {allFaculty &&
                    allFaculty.map((co: any) => (
                      <option value={co.user_id}>{co.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-sm btn-info mx-1">
            Close
          </button>
          <button onClick={onAssign} className="btn btn-sm btn-success">
            Assign
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
