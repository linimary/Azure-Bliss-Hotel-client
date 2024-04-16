import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container flex-grow-1 mt-5">
        <h2>Welcome to Admin Panel</h2>
        <hr />
        <Link to={"/existing-rooms"} className="btn btn-secondary me-2">
          Manage Rooms
        </Link>
        <Link to={"/existing-bookings"} className="btn btn-secondary">
          Manage Bookings
        </Link>
      </div>
    </div>
  );
};

export default Admin;
