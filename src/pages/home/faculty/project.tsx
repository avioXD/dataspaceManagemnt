import { Columns } from "../../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../services/_protected_api";
import PrimeDataTable from "../../../common/prime_data_table";
import userState from "../../../store/_userState";
export default function Projects(){
    const { user } = userState();
    const { get_faculty_project, faculty_project_assign_accepted } = protectedApiService();
    const [allData, setAllData] = useState(null);

    const tablesStructure: Columns[] = [
        {
          data_name: "name",
          header: "Name",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "email",
          header: "Email ID",
          sortable: false,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "contact_no",
          header: "Contact",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "project_assign",
          header: "Assign Project",
          sortable: true,
          dataFilter: (data: any, key: any) => 
          {
           // console.log(data);
            if(data[key]==0){
                   return(
                    <><div className="border border-primary text-primary" style={{borderRadius: "5px", padding: "3px 15px", fontWeight: "600", border: "2px solid 0082C1 !important"}} onClick={()=>{click_to_accept_project(data["project_assign_id"])}}>Enable Project</div></>
                   );
            }else{
                return(
                  <><div className="border border-success"  style={{borderRadius: "5px", padding: "3px 15px", fontWeight: "600", border: "2px solid #00BD32 !important", color:"#00BD32"}}>Enabled Project</div></>
                )
                }
          }
          ,
        },
        
        {
          data_name: "project_assign",
          header: "Project Status",
          sortable: true,
          dataFilter: (data: any, key: any) =>{
            return(
               <><div className="border border-primary text-primary" style={{borderRadius: "5px", padding: "3px 15px", fontWeight: "600", border: "2px solid 0082C1 !important"}}>View</div></>
            )
          },
        },
      ];

    useEffect(()=>{
       get_faculty_project_data()
    },[])

    const get_faculty_project_data = async()=>{
        const data = await get_faculty_project(user.user_id);
        //console.log(data);
        setAllData(data);
    }


    const click_to_accept_project = async(assign_id:any)=>{
       // console.log(assign_id);
        const dt = await faculty_project_assign_accepted(assign_id);
        if(dt==1){
            get_faculty_project_data();
        }

    }


    return(
        <>
        
        <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"Project Details"}
        
        onRefresh={get_faculty_project_data}
        
        options
      />
        </>
    )
}