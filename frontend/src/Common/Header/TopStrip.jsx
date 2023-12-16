import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeAllCookies } from "../../util/cookieUtil";
import { logout } from "../../features/auth/authSlice";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Components
import Title from "../Title";

// Stylesheet
import "./TopStrip.css";

const TopStrip = () => {
  const isAdmin = useAdminLoginStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOutHandler() {
    removeAllCookies();
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/login");
    window.location.reload();
  }
  return (
    <div className="d-none d-sm-flex justify-content-between align-items-center topStrip">
      <div>
        <Title title="Welcome to Leom Tech" cssClass={"fs-6 fw-normal"} />
      </div>
      <div className="d-flex justify-content-between gap-4 quickContact">
        <span> +1 806 524 9547</span>
        <span>
          <i className="fa fa-paper-plane me-1" aria-hidden="true"></i>
          <a href="mailto:info@leomtech.com">info@leomtech.com</a>
        </span>
        {isAdmin ? (
          <span>
            <a href="#nolink" onClick={logOutHandler}>
              Logout
            </a>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default TopStrip;
