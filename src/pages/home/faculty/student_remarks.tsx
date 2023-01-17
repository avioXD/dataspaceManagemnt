import { Columns } from "../../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../services/_protected_api";
import PrimeDataTable from "../../../common/prime_data_table";
import userState from "../../../store/_userState";
export default function StudentRemarks(){
    const { user } = userState();
    const { get_student_remarks } = protectedApiService();
    const [allData, setAllData] = useState(null);

    const tablesStructure: Columns[] = [
        {
          data_name: "student_name",
          header: "Student Name",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "faculty_name",
          header: "Faculty Name",
          sortable: false,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "date",
          header: "Date",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "feedback",
          header: "Feedback",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        
        {
          data_name: "ratings",
          header: "Faculty Ratings",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
            data_name: "course_name",
            header: "Class",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },
          {
            data_name: "to_student_ratings",
            header: "Student Ratings",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },
          {
            data_name: "other_data",
            header: "Others",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },
      ];

    useEffect(()=>{
    get_faculty_student_remarks();
    },[])

    const get_faculty_student_remarks = async()=>{
         const get_data = await get_student_remarks(user.user_id);
         //console.log(get_data);
         setAllData(get_data);
    } 

    return(
        <>
        <PrimeDataTable
        data={allData || []}
        structure={tablesStructure}
        title={"All Students Ratings Data"}
        
        onRefresh={get_faculty_student_remarks}
        
        options
      />
        </>
    );
}