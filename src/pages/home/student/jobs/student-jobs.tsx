import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { SlGraduation } from "react-icons/sl";
export default function StudentJobs() {
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Courses</h5>
          <div className="row">
            {new Array(10).fill(0).map((x) => (
              <div className="col-sm-6 flex-center  ">
                <Link to="Selected Job">
                  <div className="card m-2 p-4 jobs-card">
                    <div className="flex-between">
                      <h5 className="heading text-dark">
                        Front-End Engineer React JS
                      </h5>
                      <h5 className="heading text-primary">Rs. 10 - 15 LPA</h5>
                    </div>
                    <p className="text-gray">Numax Data Lab Pvt. Ltd.</p>
                    <div className="row p-2">
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
                    <hr />
                    <p className="text-gray">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nesciunt fugit excepturi, provident quos eum aliquid
                      doloremque ullam laudantium natus inventore tempora sunt
                      illo ratione. Assumenda eligendi quia animi molestias
                      veniam!
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
