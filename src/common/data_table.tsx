import { Columns } from "../interfaces/_common";
import { CgMoreVertical } from "react-icons/cg";
import { CgRuler } from "react-icons/cg";
import { VscBook } from "react-icons/vsc";
import { AiOutlineRadiusSetting } from "react-icons/ai";
import { TbMessage2, TbEye } from "react-icons/tb";
import { useState, useEffect } from "react";

export default function MyDataTable({
  structure,
  data,
  isForStudent,
  title,
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
  const blank_arr: any[] = [];
  const [changeableData, setChangeableData] = useState(data);
  const [loading, setLoading] = useState(false);
  const sortASC = (allData: any[], objField: string) => {
    setLoading(true);
    let newData: any[] = allData.sort((r1, r2) =>
      r1[objField] > r2[objField] ? 1 : r1[objField] < r2[objField] ? -1 : 0
    );
    console.log("AESC", newData);
    setChangeableData([...newData]);
    setLoading(false);
  };
  const sortDESC = (allData: any[], objField: any) => {
    setLoading(true);
    const newData: any[] = allData.sort((r1, r2) =>
      r1[objField] < r2[objField] ? 1 : r1[objField] > r2[objField] ? -1 : 0
    );
    console.log("DESC", newData);
    setChangeableData([...newData]);
    setLoading(false);
  };
  if (data) {
    return (
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
          <div className="table-body mx-auto">
            <div className="scroll">
              <table>
                <tr>
                  <div className="flex-between">
                    {" "}
                    <div className="small-th">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkall"
                        id="checkall"
                      />
                    </div>
                  </div>
                  <div></div>
                  <DynamicColumns
                    structure={structure}
                    sortASC={sortASC}
                    sortDESC={sortDESC}
                    data={changeableData}
                  />
                </tr>

                {!loading &&
                  changeableData &&
                  changeableData.map((x: any, index: any) => (
                    <tr
                      className="rows"
                      onClick={() => showMenu(`{menuid${index}}`)}
                    >
                      <div className="flex-between">
                        <div className="small-th">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                      {structure ? (
                        <>
                          {" "}
                          {structure.map((key: Columns, i: any) => (
                            <td>
                              <div className="flex-between">
                                {key.dataFilter(x[key.data_name], x)}
                              </div>
                            </td>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}

                      <div
                        id={`{menuid${index}}`}
                        className="menu"
                        onMouseLeave={removeMenu}
                      >
                        <div className="flex-start text-dark option">
                          <img src="/assets/svg/edit.svg" alt="" />
                          <span className="mx-3">Edit</span>
                        </div>
                        <div className="flex-start text-danger option">
                          <img src="/assets/svg/trash.svg" alt="" />
                          <span className="mx-3">Delete</span>
                        </div>
                      </div>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="table-body-footer">
              <div className="flex-between">
                <div className="pager"></div>
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
          </div>
        </div>
      </div>
    );
  } else {
    return <>Loading....</>;
  }
}

const DynamicColumns = ({ structure, sortASC, sortDESC, data }: any) => {
  return (
    <>
      {structure.map((item: Columns) => (
        <th>
          <div className="flex-start">
            {item.header}
            {item.sortable ? (
              <div className="sort">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    e.target.checked
                      ? sortASC(data, item.data_name)
                      : sortDESC(data, item.data_name);
                  }}
                />
                <div className="indicator">
                  <img src="/assets/svg/Filter.svg" alt="" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </th>
      ))}
    </>
  );
};
