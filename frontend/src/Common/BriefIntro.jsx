import React from "react";
import Title from "./Title";

// Styles

import "./BriefIntro.css";

const BriefIntro = ({ title, children }) => {
  return (
    <div className="row">
      <div className=" py-4 mx-0 briefIntro">
        <div className="col-md-10 offset-md-1 px-4 py-2 py-md-4 ">
          <Title title={title} cssClass="mb-2 fw-bold fs-2 text-center" />
          <p className="text-center lh-md m-0 fs-5 fw-medium">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default BriefIntro;
