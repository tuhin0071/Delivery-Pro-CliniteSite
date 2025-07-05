import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      {/* Mobile toggle checkbox */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-base-200 shadow px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 text-lg font-bold">Dashboard</div>
          <div className="hidden lg:flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/send">Send Parcel</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Routed page content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 w-64 p-4 text-base-content min-h-full">
          <li>
            <Link to="/dashboard/myparcel">My Parcels</Link>
          </li>
          <li>
            <Link to="/dashboard/paymentHistory">Payment History</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
