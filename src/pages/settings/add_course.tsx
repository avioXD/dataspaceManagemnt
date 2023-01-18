import { Columns } from "../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../services/_protected_api";
import PrimeDataTable from "../../common/prime_data_table";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
export default function AddCourse(){

    const init = {
        course_name: "",
        course_code: "",
        description: "",
        duration: "",
        classes: ""
      };
      const [creeds, setCreeds] = useState(init);

    const {course_add} = protectedApiService();

      const onValueChange = (val: any) => {
        // console.log(val);
        setCreeds({ ...creeds, ...val });
       // console.log(val);
        // console.log(register);
      };

      const onSubmit = async () => {
        // console.log(creeds);
        const res: any = await course_add(creeds);
         if (res) {
           toast.success("Added");
         }
       };

    return(
        <>
                <div className="container view-student">
            <div className="main-body">
              <div className="row gutters-sm">
             
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Course Name</h6>
                        </div>
                        <div className="col-sm-9 text-gray text-capitalize">
                          <input
                            type="text"
                            className="form-control"
                            name="course_name"
                            id="course_name"
                         
                            aria-describedby="namelHelp"
                            placeholder="Course Name"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                             onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                           
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Course Code</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            className="form-control"
                            name="course_code"
                            id="course_code"
                          //  value={creeds.email}
                            aria-describedby="namelHelp"
                            placeholder="Course Code"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Description</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            
                            className="form-control"
                            name="description"
                            id="description"
                          //  value={creeds.contact_no}
                            aria-describedby="namelHelp"
                            placeholder="Descriptions"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Duration</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            maxLength={2}
                            className="form-control"
                            name="duration"
                            id="duration"
                           // value={creeds.designation}
                            aria-describedby="namelHelp"
                            placeholder="duration"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Total Classes</h6>
                        </div>
                        <div className="col-sm-9 text-gray">
                          <input
                            type="text"
                            className="form-control"
                            name="classes"
                            id="classes"
                            maxLength={2}
                           // value={creeds.address}
                            aria-describedby="namelHelp"
                            placeholder="Total Classes"
                            //   onBlur={(e) => onBlur({ [e.target.name]: e.target.value })}
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            onClick={() => onSubmit()}
                            className="btn btn-info"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}