import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";
export default function StudentStatus(){

    const tablesStructure: Columns[] = [
        {
          data_name: "name",
          header: "Name",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "course_name",
          header: "Course Name",
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
          data_name: "email",
          header: "Email",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "total_class_completed",
          header: "Status",
          sortable: true,
          dataFilter: (data: any, key: any) =>{
            if(data.placement==1){
                return(
                    <>
                    <span>Placement</span>
                    </>
                );
            }else if(data.interview==1){
                return(
                    <>
                    <span>Interview</span>
                    </>
                );
            }else if(data.project_assigned==1){
                return(
                    <><span>Project Assigned</span></>
                );
            }else if(data.course_completed==1){
                return(
                    <>
                    <span>Course Completed</span>
                    </>
                )
            }else if(data.assign_class==1){
                return(
                    <>
                    Assigned Class
                    </>
                )
            }else{
                return(
                    <>
                    Enrolled
                    </>
                )
            }
          },
        }
        
      ];

    const [studentstatus,setstudentstatus] = useState();

    const { getStudentStatus_all } = protectedApiService();

    useEffect(()=>{
        get_student_detailis();
    },[])

const get_student_detailis = async()=>{
    const data:any = await getStudentStatus_all();
   // console.log(data);
    setstudentstatus(data);
}

    return(
        <>
             <PrimeDataTable
        data={studentstatus || []}
        structure={tablesStructure}
        title={"Student Status"}
        isForStudent
        onRefresh={get_student_detailis}
     
      />
        </>
    );
}