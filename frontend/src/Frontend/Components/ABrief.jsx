import React from "react";
import { Link } from "react-router-dom";

// Component Import
import Title from "../../Common/Title";

// Styles
import "./ABrief.css";

// Image Import
import CareerImg from "../../Images/insrued.png";

const ABrief = ({ title, cssClass, linkClass }) => {
  return (
    <div className="row h-100">
      <div className="col-md-5 ABriefImg">
        <img src={CareerImg} alt="" className="w-100 h-100 img-fluid" />
      </div>
      <div className="col-md-7 p-5 d-flex justify-content-center align-items-start flex-column">
        <Title title={title} cssClass={cssClass} />
        <div>
          <p className="lh-md">
            If you are seeking a career with an organization which promotes
            innovation and excellence, Rishi Systems is the place to be. Join
            our family and become part of a winning team that serves to provide
            services beyond the demand to our customers.
          </p>
        </div>
        <div>
          <Link to="" className={linkClass}>
            Join Us Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ABrief;
