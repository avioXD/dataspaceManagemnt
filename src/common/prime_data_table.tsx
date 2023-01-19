import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { CgRuler } from "react-icons/cg";
import { VscBook } from "react-icons/vsc";
import { AiOutlineRadiusSetting } from "react-icons/ai";
import { TbMessage2, TbEye, TbFileImport } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Columns } from "../interfaces/_common";
import { BiRefresh } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import protectedApiService from "../services/_protected_api";
import { Button } from "primereact/button";
export default function PrimeDataTable({
  structure,
  data,
  isForStudent,
  title,
  onRefresh,
  noSearch,
  view,
  remove,
  viewclass,
  message,
  timeline,
  setclass,
  options,
  importable,
  filterDropdown,
  onSelect,
  noChecks,
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
  const { deleteUser } = protectedApiService();
  const [loading, setLoading] = useState("Loading....");
  const [changeableData, setChangeableData] = useState(data);
  useEffect(() => {
    setChangeableData(data);
    setTimeout(() => {
      setLoading("No Data Available");
    }, 4500);
  }, [data]);

  const empt: any[] = [];
  const [selectedData, setSelectedData] = useState<any[]>([]);

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
  const onDelete = async (creeds: any) => {
    const res: any = await deleteUser(creeds.user_id);
    if (res) {
      toast.success("Deleted");
      onRefresh();
    }
  };
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
              {timeline && !(selectedData.length > 1) && (
                <Link to={`/Home/Timeline`} state={selectedData}>
                  <button className="outlined-btn flex-start-center mx-1">
                    <CgRuler size={20} />
                    <span className="mx-1">Timeline</span>
                  </button>
                </Link>
              )}
              {message && (
                <Link to={`/Home/Message`} state={selectedData}>
                  <button className="outlined-btn flex-start-center mx-1">
                    <TbMessage2 size={20} />
                    <span className="mx-1">Message</span>
                  </button>
                </Link>
              )}

              {view && !(selectedData.length > 1) && (
                <Link
                  to={`/Home/Students/View Student Class`}
                  state={selectedData}
                >
                  <button className="outlined-btn flex-start-center mx-1">
                    <TbEye size={20} />
                    <span className="mx-1">View Classes</span>
                  </button>
                </Link>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        {importable && (
          <button
            onClick={() => exportCSV(false)}
            className="outlined-btn flex-start-center mx-1"
          >
            <TbFileImport size={20} />
            <span className="mx-1">Import</span>
          </button>
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
        <Button
          icon="pi pi-angle-left"
          onClick={options.onClick}
          className="p-button-rounded p-btn-info p-button-outlined   m-1"
          disabled={options.disabled}
        />
      );
    },
    NextPageLink: (options: any) => {
      return (
        <Button
          icon="pi pi-angle-right"
          onClick={options.onClick}
          className="p-button-rounded p-btn-info p-button-outlined   m-1"
          disabled={options.disabled}
        />
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
        <>
          <Button
            label={options.page + 1}
            onClick={options.onClick}
            className="p-button-rounded p-btn-info p-button-outlined   m-1"
          />
        </>
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

  const onSearch = (search: any) => {
    let keys: any = Object.keys(data[0]);
    // console.log(keys);
    let searchedData: any[] = data.filter((d: any) => {
      let checker: any[] = [];
      keys.map((k: any) => {
        var strRegExPattern = `${search}.*`;
        if (d[k]) {
          if (typeof d[k] != "string") {
            if (
              d[k]
                .toString()
                .toLowerCase()
                .match(new RegExp(strRegExPattern, "g"))
            )
              checker.push(1);
          } else {
            if (
              new RegExp(strRegExPattern.toLocaleLowerCase(), "g").test(
                d[k].toLowerCase()
              )
            )
              checker.push(1);
          }
        }
        return 0;
      });
      if (checker.length) {
        return true;
      } else {
        return false;
      }
    });
    setChangeableData(searchedData);
  };
  const dt = useRef<any>(null);
  const exportCSV = (selectionOnly: any) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const header: any = (
    <div className="flex align-items-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file"
        onClick={() => exportCSV(false)}
        className="mr-2"
        data-pr-tooltip="CSV"
      />
    </div>
  );

  return (
    <>
      <div className="table">
        <div className="table-main mx-auto">
          <div className="table-header">
            <div className="row">
              <div className="heading col-sm-4">
                {title ? title : "All Details"}
              </div>

              {!noSearch && data && (
                <div className="col-sm-8 row  ">
                  <div className="col-sm-7 p-1">
                    <div className="filter flex-end mr-2">
                      {filterDropdown &&
                        filterDropdown.map((fil: any) => (
                          <>
                            <FilterDropdown
                              allData={data}
                              filterField={fil.filter}
                              setChangeableData={setChangeableData}
                              header={fil.header}
                            />
                          </>
                        ))}
                    </div>
                  </div>
                  <div className="col-sm-5    p-1">
                    <div className="search ">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="search"
                        onChange={(e) => {
                          onSearch(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {changeableData?.length ? (
            <>
              <div className="table-body mx-auto">
                <DataTable
                  ref={dt}
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
                  {!noChecks && (
                    <Column
                      selectionMode="multiple"
                      headerStyle={{ width: "3em" }}
                    ></Column>
                  )}
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
                                <button
                                  onClick={() => onDelete(e)}
                                  className="flex-start text-danger option"
                                >
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
export const FilterDropdown = ({
  allData,
  filterField,
  setChangeableData,
  header,
}: any) => {
  const [uniqueItems, setUniqueItems] = useState<any>(null);
  function groupBy(arr: any, property: any) {
    return arr.reduce(function (memo: any, x: any) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const setRunningCourses = () => {
    var course_set: any = [];
    allData.forEach((element: any) => {
      course_set.push(element[filterField]);
    });
    let unique: any = [...new Set(course_set)];
    // let items = groupBy(allData, "course_name");
    console.log(unique);
    setUniqueItems(unique);
  };
  const onValueChange = (value: any) => {
    if (value == "all") {
      setChangeableData(allData);
    } else {
      const newValue: any[] = [];
      allData.map((data: any) => {
        if (data[filterField] == value) {
          newValue.push(data);
        }
      });
      console.log(newValue);
      setChangeableData(newValue);
    }
  };
  useEffect(() => {
    setRunningCourses();
  }, []);
  return (
    <>
      <select
        className="form-select"
        name="course_mode"
        style={{ maxWidth: "18rem" }}
        id="course_mode"
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="default" disabled selected hidden>
          Select {header || ""}
        </option>
        <option value="all">All</option>
        {uniqueItems &&
          uniqueItems.map((item: any) => (
            <>{item && <option value={item}>{item}</option>}</>
          ))}
      </select>
    </>
  );
};
