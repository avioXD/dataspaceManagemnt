import { Columns } from "../../interfaces/_common";
import globalDataStore from "../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../services/_protected_api";
import PrimeDataTable from "../../common/prime_data_table";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
export default function Councellors(){

    const [councellors,setcouncellors] = useState([]);

    const {get_councellors,councellor_delete} = protectedApiService();

    const tablesStructure: Columns[] = [
        {
          data_name: "counsellor_name",
          header: "Counsellor Name",
          sortable: true,
          dataFilter: (data: any, key: any) =>
            (
              <>
                <span className="limited-char">{data[key]}</span>
              </>
            ) || <></>,
        },
        {
          data_name: "operation",
          header: "Operation",
          sortable: false,
          dataFilter: (data: any, key: any) => {
            return (
              <>
                <Link to="/Home/Settings/Edit Counsellor" state={data}>
                  <Button
                    icon="pi pi-file-edit"
                    className="p-button-rounded p-button-primary p-button-outlined"
                    aria-label="Delete"
                  />
                </Link>
                <Button
                  onClick={() => deleteOnecouncellor(data)}
                  icon="pi pi-trash
                    "
                  className="mx-2 p-button-rounded p-button-danger p-button-outlined"
                  aria-label="Delete"
                />
              </>
            );
          },
        },
      ];


    useEffect(()=>{
        get_all_branches();
    },[])
    
    const get_all_branches = async() =>{
    const data = await get_councellors();
    //console.log(data);
    setcouncellors(data);
    }

    const deleteOnecouncellor = async(data:any)=>{
      const conf = window.confirm("Are you sure to delete?");
      if(conf==true){
        //console.log(data);
        const res_data = await councellor_delete(data.counsellor_id);
        if(res_data==1){
          toast.error("Deleted Successfully");
          get_all_branches();
        }else{
          toast.error("Error");
        }
      }
      
    
    }

    return(
        <>
           <div className="das-exs ">
          <div className="flex-end mx-4">
            <Link to="/Home/Settings/Add Councellor">
              <button className="btn btn-primary">Add Councellor</button>
            </Link>
          </div>
        </div>
        <PrimeDataTable
          data={councellors || []}
          structure={tablesStructure}
          title={"All Branches"}
          onRefresh={get_all_branches}
        />
        </>
    )
}