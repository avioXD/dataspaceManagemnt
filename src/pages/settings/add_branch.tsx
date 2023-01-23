import { Columns } from "../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../services/_protected_api";
import PrimeDataTable from "../../common/prime_data_table";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
export default function Addbranches(){

    const init = {
        branch_name: "",
      
      };
      const [creeds, setCreeds] = useState(init);

    const {branch_add} = protectedApiService();

      const onValueChange = (val: any) => {
        // console.log(val);
        setCreeds({ ...creeds, ...val });
       // console.log(val);
        // console.log(register);
      };

      const onSubmit = async () => {
        // console.log(creeds);
        const res: any = await branch_add(creeds);
         if (res==1) {
           toast.success("Added");
         }else{
            toast.error("Error! Please try again later");
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
                          <h6 className="mb-0">Branch</h6>
                        </div>
                        <div className="col-sm-9 text-gray text-capitalize">
                          <input
                            type="text"
                            className="form-control"
                            name="branch_name"
                            id="branch_name"
                         
                            aria-describedby="namelHelp"
                            placeholder="Branch Name"
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
    );
}