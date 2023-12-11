import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";

// Component
import Title from "../Title";

// Styles
import "./banner.css";

const Banner = ({ getBannerAPIURL, bannerState }) => {
  const [bannerdata, setBannerData] = useState([]);
  const baseURL = getBaseURL();

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status == 200) {
          setBannerData(response.data.imageModel);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!bannerState) {
      getBannerData();
    }
  }, [bannerState]);

  return (
    <div className="pageBanner">
      <div
        className={
          bannerdata.imageDescription && bannerdata.imageTitle
            ? "titleCaption d-flex jutify-content-center align-items-center flex-column-reverse"
            : ""
        }
      >
        <p>{bannerdata.imageDescription}</p>
        <Title title={bannerdata.imageTitle} />
      </div>
      <img
        src={`${baseURL}${bannerdata.path}`}
        alt={bannerdata.alternitivetext}
        className="w-100"
      />
    </div>
  );
};
export default Banner;
