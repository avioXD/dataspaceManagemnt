import { Columns } from "../../../interfaces/_common";
import React, { useEffect, useState } from "react";
import protectedApiService from "../../../services/_protected_api";
import PrimeDataTable from "../../../common/prime_data_table";
import Loader2 from "../../../common/loader2";
export default function Studentevents() {
  const { getFacultyevents } = protectedApiService();
  const [allData, setAllData] = useState<any>(null);

  useEffect(() => {
    get_events();
  }, []);

  const get_events = async () => {
    const data: any = await getFacultyevents();
    setAllData(data);
  };

  const tablesStructure: Columns[] = [
    {
      data_name: "event_name",
      header: "Event Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "instructor_name",
      header: "Instructor",
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
      data_name: "time",
      header: "Time",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },

    {
      data_name: "link",
      header: "Link",
      sortable: true,
      dataFilter: (data: any, key: any) => {
        if (data[key] != "") {
          return (
            <>
              <a
                className="border border-primary text-primary"
                style={{
                  borderRadius: "5px",
                  padding: "3px 15px",
                  fontWeight: "600",
                  border: "2px solid 0082C1 !important",
                }}
                href={data[key]}
                target="_blank"
              >
                View
              </a>
            </>
          );
        }
      },
    },
  ];

  return (
    <>
      {allData ? (
        <PrimeDataTable
          data={allData || []}
          structure={tablesStructure}
          title={"All Events"}
          onRefresh={get_events}
          options
        />
      ) : (
        <>
          <Loader2 />
        </>
      )}
    </>
  );
}
