import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";

export default function ClassReport() {

    const tablesStructure: Columns[] = [
        {
          data_name: "name",
          header: "Name",
          sortable: true,
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
            data_name: "faculty_name",
            header: "Faculty Name",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },

          {
            data_name: "course_name",
            header: "Course Name",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },
          {
            data_name: "email",
            header: "Class Date & Time",
            sortable: true,
            dataFilter: (data: any, key: any) =>{
                return(
                    <>
                    {data.date} {data.start_time} - {data.end_time}
                    </>
                )
                
            },
          },

          {
            data_name: "class",
            header: "Class",
            sortable: true,
            dataFilter: (data: any, key: any) =>{
                if(data.student_cls==1){
                    return(
                        <>
                        <span className="text-success">Present</span>
                        </>
                    );
                }else if(data.student_cls==0){
                    return(
                        <>
                          <span className="text-danger">Absent</span>
                        </>
                    )
                }
            },
          },
        
      ];


    const [classreport, setclassreport] = useState([]);

const {getclassreport} = protectedApiService();




useEffect(()=>{
    get_classreport();
},[])


const get_classreport = async()=>{
    const data = await getclassreport();
    setclassreport(data);
   // console.log(data);
}


    return(
        <>
                     <PrimeDataTable
        data={classreport || []}
        structure={tablesStructure}
        title={"Class Report"}
        isForStudent
        onRefresh={get_classreport}
       
      />
        </>
    );
}
