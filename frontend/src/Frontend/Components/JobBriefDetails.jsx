import React from "react";
import { Link } from "react-router-dom";

import Title from "../../Common/Title";

const JobBriefDetails = () => {
  return (
    <div className="jobBriefDetails p-5 py-4 ">
      <Title title="BUSINESS ANALYST II" />
      <small className="d-block mb-3">Federal client - Washington DC</small>
      <span className="d-block mb-1">
        <strong>Experience</strong> : Minimum 3 years+
      </span>
      <span className="d-block">
        <strong>Education</strong> : Bachelor’s Degree required
      </span>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <span>
            <strong>Posted</strong> 3 days ago{" "}
          </span>
          <span>
            <strong>Openings</strong> 7{" "}
          </span>
        </div>
        <Link className="btn btn-primary" to="mailto:hr@lemotech.com">
          hr@lemotech.com
        </Link>
      </div>
    </div>
  );
};

export default JobBriefDetails;
