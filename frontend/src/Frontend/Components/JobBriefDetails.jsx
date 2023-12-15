import React from "react";
import { Link } from "react-router-dom";

import Title from "../../Common/Title";
import { showPosteddate } from "../../util/commonUtil";

const JobBriefDetails = ({ jobDetails }) => {
  return (
    <div className="jobBriefDetails p-5 py-4 ">
      <Title
        title={jobDetails.job_title ? jobDetails.job_title : "Default Career"}
      />
      <small className="d-block mb-3">
        {jobDetails.job_location ? jobDetails.job_location : "Default Career"}
      </small>
      <span className="d-block mb-1">
        <strong>Experience</strong> : Minimum{" "}
        {jobDetails.experience_from ? jobDetails.experience_from : 0} to{" "}
        {jobDetails.experience_to ? jobDetails.experience_to : 0} years+
      </span>
      <span className="d-block">
        <strong>Education</strong> :{" "}
        {jobDetails.education ? jobDetails.education : "Default Career"}
      </span>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <span>
            <strong>Posted</strong> &nbsp;{" "}
            {showPosteddate(jobDetails.posted_date)} days ago{" "}
          </span>
          <span>
            <strong>Openings</strong>{" "}
            {jobDetails.openings ? jobDetails.openings : 0}
          </span>
        </div>
        <Link
          className="btn btn-primary"
          to={
            jobDetails.contactEmail
              ? jobDetails.contactEmail
              : "hr@leomtech.com"
          }
        >
          Contact US
        </Link>
      </div>
    </div>
  );
};

export default JobBriefDetails;
