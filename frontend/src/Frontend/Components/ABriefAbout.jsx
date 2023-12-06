import React from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles

import "./ABriefAbout.css";

// Images
import whoweare from "../../Images/whoweare.jpg";

const ABriefAbout = ({ title, cssClass, linkClass }) => {
  return (
    <>
      <div className="col-md-7">
        <div className="row h-100">
          <div className="col-md-12 p-5 d-flex justify-content-center align-items-start flex-column">
            <Title title={title} cssClass={cssClass} />
            <div>
              <p className="lh-md">
                Iaculis eu non diam phasellus vestibulum lorem sed risus. Nunc
                aliquet bibendum enim facilisis gravida neque convallis a. In
                nibh mauris cursus mattis molestie a. Senectus et netus et
                malesuada fames ac turpis egestas. Quis vel eros donec ac.
                Lobortis feugiat vivamus at augue eget arcu dictum.
              </p>
            </div>
            <div>
              <Link to="" className={linkClass}>
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-5 p-0 text-center">
        <img src={whoweare} alt="" className="" />
      </div>
    </>
  );
};

export default ABriefAbout;
