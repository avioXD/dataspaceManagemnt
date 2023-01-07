import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
import { Chip } from "primereact/chip";
export default function SelectedJobs() {
  return (
    <>
      <>
        <div className="col-sm-7">
          <div className="card shadow m-2 p-4 jobs-card no-border">
            <div className="flex-between">
              <h5 className="heading">Front-End Engineer React JS</h5>
              <h5 className="heading text-primary">Rs. 10 - 15 LPA</h5>
            </div>
            <p className="text-gray">Numax Data Lab Pvt. Ltd.</p>
            <div className="row p-2">
              <div className="col-lg-8">
                <div className="row  ">
                  <div className="chips btn-sm    ">
                    <IoBriefcaseOutline className="mx-2" /> 3-5 years
                  </div>
                  <div className="chips btn-sm   ">
                    <BsClockHistory className="mx-2" /> Full Time
                  </div>
                  <div className="chips btn-sm  ">
                    <GrLocation className="mx-2" /> Hyderabad
                  </div>
                  <div className="chips btn-sm   ">
                    <SlGraduation className="mx-2" /> Graduation / Diploma
                  </div>
                </div>
              </div>
              <div className="col-sm-4 flex-end">
                <button className="btn btn-primary">Apply</button>
              </div>
            </div>
            <hr />
            <div className="mt-2 content">
              <h5 className="heading">Job Description</h5>
              <p className="text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt fugit excepturi, provident quos eum aliquid doloremque
                ullam laudantium natus inventore tempora sunt illo ratione.
                Assumenda eligendi quia animi molestias veniam!
              </p>
            </div>
            <div className="mt-2 content">
              <h5 className="heading">Job Description</h5>
              <p className="text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt fugit excepturi, provident quos eum aliquid doloremque
                ullam laudantium natus inventore tempora sunt illo ratione.
                Assumenda eligendi quia animi molestias veniam!
              </p>
            </div>
            <div className="mt-2 content">
              <h5 className="heading">Skill Required</h5>
              <div className="flex align-items-center flex-wrap">
                <Chip label="Action" className="mb-2 custom-chip" />
                <Chip label="Comedy" className="mb-2 custom-chip" />
                <Chip label="Mystery" className="mb-2 custom-chip" />
                <Chip label="Thriller" className="mb-2 custom-chip" />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
