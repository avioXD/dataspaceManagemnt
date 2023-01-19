import { Columns } from "../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../services/_protected_api";
import PrimeDataTable from "../../common/prime_data_table";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
export default function Courses(){
    const { get_student_all_courses,course_delete } = protectedApiService();
    const [allData, setAllData] = useState(null);

    const tablesStructure: Columns[] = [
        {
          data_name: "course_name",
          header: "Course Name",
          sortable: true,
          dataFilter: (data: any, key: any) =>
            (
              <>
                <span className="limited-char">{data[key]}</span>
              </>
            ) || <></>,
        },
        {
          data_name: "duration",
          header: "Duration",
          sortable: true,
          dataFilter: (data: any, key: any) =>
            (
              <>
                <span className="limited-char">{data[key]}</span>
              </>
            ) || <></>,
        },
        {
          data_name: "description",
          header: "Course Description",
          sortable: true,
          dataFilter: (data: any, key: any) =>
            (
              <>
                <span className="limited-char">{data[key]}</span>
              </>
            ) || <></>,
        },
        {
            data_name: "classes",
            header: "Total Classes",
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
                  <Link to="/Home/Settings/Edit Course" state={data}>
                    <Button
                      icon="pi pi-file-edit"
                      className="p-button-rounded p-button-primary p-button-outlined"
                      aria-label="Delete"
                    />
                  </Link>
                  <Button
                    onClick={() => deleteOneJob(data)}
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
get_all_courses();
},[])

const get_all_courses = async()=>{
    const data = await get_student_all_courses();
    console.log(data);
    setAllData(data);
}

const deleteOneJob = async(data:any)=>{
   // console.log(data);
   const confm = window.confirm("Are you sure to delete?");
   if(confm===true){
    const res_data = await course_delete(data.course_id);
    if(res_data.status==1){
        toast.error("Course Deleted successfully");
        get_all_courses();
    }
   // console.log(data);
   }
}

    return(
        <>
        <div className="das-exs ">
          <div className="flex-end mx-4">
            <Link to="/Home/Settings/Add Course">
              <button className="btn btn-primary">Add Course</button>
            </Link>
          </div>
        </div>
        <PrimeDataTable
          data={allData || []}
          structure={tablesStructure}
          title={"All Course"}
          onRefresh={get_all_courses}
        />
      </>
    )
}