import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function AllResources() {
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">All Resources</h5>
          <div className="row">
            {new Array(10).fill(0).map((x) => (
              <div className="col-sm-3">
                <div className="card assignment-card p-3">
                  <div className="flex-center flex-column">
                    <img src="/assets/student/notes.png" alt="" />
                    <h5 className="heading text-center">Penetration Testing</h5>
                  </div>
                  <Link
                    to="/StudentClasses/Resources/SelectedResource"
                    state={x.classList}
                  >
                    <button className="btn btn-sm mt-2 btn-primary btn-wide">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
