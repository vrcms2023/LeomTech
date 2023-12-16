import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { getCookie } from "../../../util/cookieUtil";

import "./MainPage.css";

const MainPage = () => {
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  useEffect(() => {
    setisSuperAdmin(JSON.parse(getCookie("is_admin")));
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center adminMain">
      <Title
        title="Page Content's Customization"
        cssClass="text-dark fs-3 mb-4 fw-bold text-center"
      />
      <ul className="list-group mainLinks">
       

        {isSuperAdmin ? (
          <li className="list-group-item list-group-item-action text-center border-secondary py-3">
            <Link
              to="/userAdmin"
              className="blue-500 text-decoration-none fs-4"
            >
              User Administration
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="list-group-item list-group-item-action text-center border-secondary py-3">
          <Link
            to="/change_password"
            className="blue-500 text-decoration-none fs-4"
          >
            Change Password
          </Link>
        </li>
        <li className="list-group-item list-group-item-action text-center border-secondary py-3">
          <Link
            to="/contactUSList"
            className="blue-500 text-decoration-none fs-4"
          >
            Contact US
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default MainPage;
