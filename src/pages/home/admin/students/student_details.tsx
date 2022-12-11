import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function StudentDetails() {
  const location = useLocation();
  const student = location.state;
  const [creeds, setCreeds] = useState("");

  return (
    <>
      <div className="p-3 view-student">
        <h4>Student Profile</h4>
        <div className="card shadow p-5">
          <div className="content  d-flex justify-content-start">
            <div className="photo">
              <p>Student Photo: </p>
              <img src="/assets/bg/register_bg.png" alt="" />
            </div>
            <div className="details mx-3">
              <div className="row ">
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex-between p-3">
                    <p>Full Name:</p>
                    <p>Abhishek Das</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
