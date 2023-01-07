import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

export default function SelectedResource() {
  return (
    <>
      <>
        <div className="card  enrolled p-4">
          <h5 className="heading">Resources</h5>
          <div className="card shadow-sm p-4">
            <div className="flex-center flex-column">
              <img src="/assets/png/bsi.png" alt="" />
            </div>
            <div className="flex-between">
              <h4 className="heading">The Best Study Tips Reveled</h4>
              <Button
                label="Download"
                className="p-button-primary p-button-text"
                icon="pi pi-download"
                iconPos="left"
              />
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                et, eveniet est asperiores vel placeat aliquam voluptatum magni
                repellat molestias quia voluptate, iste quidem molestiae
                distinctio reprehenderit iure delectus unde!Lorem ipsum dolor
                sit, amet consectetur adipisicing elit. Nobis et, eveniet est
                asperiores vel placeat aliquam voluptatum magni repellat
                molestias quia voluptate, iste quidem molestiae distinctio
                reprehenderit iure delectus unde!Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Nobis et, eveniet est asperiores
                vel placeat aliquam voluptatum magni repellat molestias quia
                voluptate, iste quidem molestiae distinctio reprehenderit iure
                delectus unde!Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Nobis et, eveniet est asperiores vel placeat
                aliquam voluptatum magni repellat molestias quia voluptate, iste
                quidem molestiae distinctio reprehenderit iure delectus unde!
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
