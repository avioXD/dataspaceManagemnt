import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function CourseCertificate() {
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Assignments</h5>
          <div className="card  certificate p-4">
            <h4 className=" text-center">Your Certificate is locked!</h4>
            <p className="text-center">
              Complete your course to unlock this certificate.{" "}
            </p>
            <img src="/assets/student/Certificate.png" alt="" />
          </div>
        </div>
      </>
    </>
  );
}
