import React, { useEffect, useState } from "react";
import Title from "./Title";
import { axiosClientServiceApi } from "../util/axiosUtil";

// Styles

import "./BriefIntro.css";

const BriefIntroFrontend = ({ pageType, introState }) => {
  const [introValue, setIntroValues] = useState([]);

  useEffect(() => {
    const getBriefIntro = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/carousel/clientHomeIntro/${pageType}/`,
        );
        if (response?.status === 200) {
          setIntroValues(response.data.intro);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!introState) {
      getBriefIntro();
    }
  }, [introState]);

  return (
    <div className="container-fluid">
      <div className="row">
          <div className=" py-4 mx-0 briefIntro">
            <div className="col-md-10 offset-md-1 px-4 py-2 py-md-4 ">
              {introValue.intro_title === "" ? "" : 
                <Title
                  title={`${
                    introValue.intro_title
                      ? introValue.intro_title
                      : "Please Update Title"
                  }`}
                  cssClass="mb-0 fw-bold fs-2 text-center"
                />
              }
              {introValue.subTitle === "" ? "" : 
                <Title
                  title={`${
                    introValue.intro_title
                      ? introValue.subTitle
                      : "Please Update Title"
                  }`}
                  cssClass="mb-3 fw-bold text-secondary fs-6 text-center"
                />
              }
              <p className="text-center lh-md m-0 fs-6 fw-medium">
                {introValue.intro_desc
                  ? introValue.intro_desc
                  : "Please Update Description"}
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default BriefIntroFrontend;
