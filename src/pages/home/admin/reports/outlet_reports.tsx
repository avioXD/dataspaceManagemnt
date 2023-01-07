import { Outlet } from "react-router-dom";

export default function ReportsOutlet() {
  return (
    <div className="admin-dashboard">
      <Outlet />
    </div>
  );
}
