import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { PdfViewer } from "./pdfviewer";
import Loader from "../../../../../common/loader";

export default function SelectedResource() {
  const location: any = useLocation();
  const resource: any = location.state;
  const navigate = useNavigate();

  return (
    <>
      <>
        {resource && <Loader />}
        {resource && (
          <div className="card  p-4">
            <h5 className="heading">Resources</h5>
            <div className="card shadow-sm p-4">
              <div className="flex-center flex-column mb-4">
                <PdfViewer
                  pdf={
                    "http://dataspaceacademymanagement.in/skillup/public/note/note_1669896766UlKotA4u3skwTgISq3Rr3w7wKjdbecqjPo4JjeH1.pdf"
                  }
                />
              </div>
              <div className="flex-between">
                <h4 className="heading">{resource.title}</h4>
                <a href={resource.resource_link}>
                  <Button
                    label="Download"
                    className="p-button-primary p-button-text"
                    icon="pi pi-download"
                    iconPos="left"
                  />
                </a>
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: resource.description }}
              ></div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
