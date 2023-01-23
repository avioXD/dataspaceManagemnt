import { Columns } from "../../../../interfaces/_common";
import globalDataStore from "../../../../store/_globalData";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../../services/_protected_api";
import PrimeDataTable from "../../../../common/prime_data_table";
import { Link } from "react-router-dom";
export default function ReferredUser(){


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
            data_name: "referer_name",
            header: "Referer Name",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          }
        
      ];


const [ref_users, setref_users] = useState([]);

const {referredusers} = protectedApiService();


useEffect(()=>{
    get_all_ref();
},[])

const get_all_ref = async()=>{

    const data = await referredusers();
   // console.log(data);
    setref_users(data);

}

    return(
        <>
           <PrimeDataTable
        data={ref_users || []}
        structure={tablesStructure}
        title={"Ref Users"}
        isForStudent
        onRefresh={get_all_ref}
      
       
      />
        </>
    )
}