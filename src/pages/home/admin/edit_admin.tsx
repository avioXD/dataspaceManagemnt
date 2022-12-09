import DataTable from "../../../common/data_table";
import { Columns } from "../../../interfaces/_common";
import globalDataStore from "../../../store/_globalData";
import AddAdmin from "./add_admin";
export default function EditAdmin() {
  const tablesStructure: Columns[] = [
    {
      data_name: "name",
      header: "Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data,
    },
    {
      data_name: "email",
      header: "EmailID",
      sortable: false,
      dataFilter: (data: any, key: any) => data,
    },
    {
      data_name: "contact_no",
      header: "Contact",
      sortable: true,
      dataFilter: (data: any, key: any) => data,
    },
    {
      data_name: "designation",
      header: "Designation",
      sortable: true,
      dataFilter: (data: any, key: any) => data,
    },
  ];
  const emtarr: any[] = [];
  const { allAdmins } = globalDataStore();

  return (
    <>
      <div className="das-exs p-3">
        <div className="flex-end mx-4">
          <button className="btn btn-primary">Add Admin</button>
        </div>
      </div>
      <AddAdmin />
      {/* <DataTable
        data={allAdmins}
        structure={tablesStructure}
        title={"All Admin Details"}
        isForStudent
      /> */}
    </>
  );
}
