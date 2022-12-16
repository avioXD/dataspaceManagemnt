import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
import { BiRefresh } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, useLocation } from "react-router-dom";
export default function PrimeDataTable({
  structure,
  data,
  isForStudent,
  title,
  onRefresh,
  view,
  viewclass,
  message,
  timeline,
  setclass,
  options,
}: any) {
  const location = useLocation();
  // console.log(location);
  let locationPath: any = location.pathname.replaceAll("%20", " ").split("/");
  let final_path = "";
  locationPath.forEach((element: any, index: any) => {
    if (locationPath.length - 1 != index && element) {
      final_path += "/" + element;
    }
  });

  ////********************************** */
  const showMenu = (cls: any) => {
    removeMenu();
    let menu: any = (document.getElementById(cls) as HTMLElement) || null;
    console.log(cls);
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

  const [loading, setLoading] = useState("Loading....");
  const [changeableData, setChangeableData] = useState(data);
  useEffect(() => {
    setChangeableData(data);
    setTimeout(() => {
      setLoading("No Data Available");
    }, 4500);
  }, [data]);

  const empt: any[] = [];
  const [selectedData, setSelectedData] = useState(empt);

  //********************* */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const onPageInputChange = (event: any) => {
    setCurrentPage(event.target.value);
  };
  const onSearchValueChange = () => {};

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
    <button className="btn btn-warning">
      <BiRefresh color={"white"} size={28} />
    </button>
  );

  const paginatorRight = (
    <div className="table-body-footer">
      <div className="flex-between">
        {selectedData?.length && isForStudent ? (
          <>
            {" "}
            <div className="options flex-end">
              {viewclass && (
                <button className="outlined-btn flex-start-center mx-1">
                  <VscBook size={20} />
                  <span className="mx-1">View Class</span>
                </button>
              )}

              {setclass && (
                <button className="outlined-btn flex-start-center mx-1">
                  <AiOutlineRadiusSetting size={20} />
                  <span className="mx-1">Set Class</span>
                </button>
              )}
              {timeline && (
                <button className="outlined-btn flex-start-center mx-1">
                  <CgRuler size={20} />
                  <span className="mx-1">Timeline</span>
                </button>
              )}
              {message && (
                <Link to={`${final_path}/Message`} state={selectedData}>
                  <button className="outlined-btn flex-start-center mx-1">
                    <TbMessage2 size={20} />
                    <span className="mx-1">Message</span>
                  </button>
                </Link>
              )}

              {view && (
                <button className="outlined-btn flex-start-center mx-1">
                  <TbEye size={20} />
                  <span className="mx-1">View</span>
                </button>
              )}
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

          {changeableData?.length ? (
            <>
              <div className="table-body mx-auto">
                <DataTable
                  className="live-session"
                  value={changeableData || null}
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
                  selection={selectedData}
                  onSelectionChange={(e) => setSelectedData(e.value)}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3em" }}
                  ></Column>
                  {options && (
                    <Column
                      headerStyle={{ width: "3em" }}
                      style={{
                        position: "relative",
                      }}
                      body={(e) => (
                        <>
                          {e?.user_id && (
                            <div className="table-menu">
                              <button className="tbl-btn">
                                <img
                                  className="press"
                                  onClick={() => showMenu(`menuid${e.user_id}`)}
                                  src="/assets/svg/more.svg"
                                  alt="..."
                                />
                              </button>
                              <div
                                id={`menuid${e.user_id}`}
                                className="menu"
                                onMouseLeave={removeMenu}
                              >
                                <Link to="/Home/View Profile" state={e}>
                                  <button className="flex-start text-dark option">
                                    <TbEye size={20} />
                                    <span className="mx-3">View</span>
                                  </button>
                                </Link>
                                <Link to="/Home/Edit Profile" state={e}>
                                  <button className="flex-start text-dark option">
                                    <img src="/assets/svg/edit.svg" alt="" />
                                    <span className="mx-3">Edit</span>
                                  </button>
                                </Link>
                                <button className="flex-start text-danger option">
                                  <img src="/assets/svg/trash.svg" alt="" />
                                  <span className="mx-3">Delete</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    ></Column>
                  )}

                  {changeableData?.length &&
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
            <>{loading}</>
          )}
        </div>
      </div>
    </>
  );
}
