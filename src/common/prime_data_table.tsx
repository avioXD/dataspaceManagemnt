import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";

import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { CgRuler } from "react-icons/cg";
import { VscBook } from "react-icons/vsc";
import { AiOutlineRadiusSetting } from "react-icons/ai";
import { TbMessage2, TbEye } from "react-icons/tb";
import { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { Columns } from "../interfaces/_common";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function PrimeDataTable({
  structure,
  data,
  isForStudent,
  title,
  onRefresh,
}: any) {
  const showMenu = (cls: any) => {
    removeMenu();
    let menu: any = (document.getElementById(cls) as HTMLElement) || null;
    menu.style.display = "block";
  };
  const removeMenu = () => {
    let menues: any =
      (document.getElementsByClassName(
        "menu"
      ) as HTMLCollectionOf<HTMLElement>) || null;
    Object.keys(menues).map((x: any) => {
      menues[x].style.display = "none";
    });
  };

  const [changeableData, setChangeableData] = useState(data);
  const [loading, setLoading] = useState(false);

  //********************* */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const onPageInputChange = (event: any) => {
    setCurrentPage(event.target.value);
  };
  //***************** */
  const onPageInputKeyDown = (event: any, options: any) => {
    if (event.key === "Enter") {
      const page = currentPage;
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };
  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-refresh"
      className="p-button-text"
      onClick={onRefresh}
    />
  );
  const paginatorRight = (
    <div className="table-body-footer">
      <div className="flex-between">
        {isForStudent ? (
          <>
            {" "}
            <div className="options flex-end">
              <button className="outlined-btn flex-start-center mx-1">
                <VscBook size={20} />
                <span className="mx-1">View Class</span>
              </button>
              <button className="outlined-btn flex-start-center mx-1">
                <AiOutlineRadiusSetting size={20} />
                <span className="mx-1">Set Class</span>
              </button>
              <button className="outlined-btn flex-start-center mx-1">
                <CgRuler size={20} />
                <span className="mx-1">Timeline</span>
              </button>

              <button className="outlined-btn flex-start-center mx-1">
                <TbMessage2 size={20} />
                <span className="mx-1">Message</span>
              </button>

              <button className="outlined-btn flex-start-center mx-1">
                <TbEye size={20} />
                <span className="mx-1">View</span>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
  //****************** *//
  const tableTemplate: any = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options: any) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">{"<"}</span>
        </button>
      );
    },
    NextPageLink: (options: any) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">{">"}</span>
        </button>
      );
    },
    PageLinks: (options: any) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <>
          {/* <DropdownButton
            key={"primary"}
            id={`dropdown-variants-primary`}
            variant={"primary"}
            title={"10"}
            defaultValue={options.value}
            onChange={options.page + 1}
          >
            {dropdownOptions.map((x) => (
              <Dropdown.Item eventKey={x.value} value={x.value}>
                {x.label}
              </Dropdown.Item>
            ))}
          </DropdownButton> */}
        </>
      );
    },
    CurrentPageReport: (options: any) => {
      return <></>;
    },
  };

  return (
    <>
      <div className="table">
        <div className="table-main mx-auto">
          <div className="table-header">
            <div className="row">
              <div className="heading col-sm-4">
                {title ? title : "All Details"}
              </div>
              <div className="col-sm-8">
                <div className="search">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>

          {data?.length ? (
            <>
              {" "}
              <div className="table-body mx-auto">
                <DataTable
                  className="live-session"
                  value={data || null}
                  sortMode="multiple"
                  responsiveLayout="scroll"
                  paginator
                  paginatorTemplate={tableTemplate}
                  // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                  rows={10}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginatorLeft={paginatorLeft}
                  paginatorRight={paginatorRight}
                >
                  {console.log("data", data)}
                  {data?.length &&
                    structure.map((key: Columns) => (
                      <Column
                        field={key.data_name}
                        header={key.header}
                        sortable={key.sortable}
                        body={(e) => {
                          return (
                            <>
                              <div className="flex-start">
                                {key.dataFilter(e, key.data_name)}
                              </div>
                            </>
                          );
                        }}
                      ></Column>
                    ))}
                </DataTable>
              </div>
            </>
          ) : (
            <>No Data Available</>
          )}
        </div>
      </div>
    </>
  );
}
