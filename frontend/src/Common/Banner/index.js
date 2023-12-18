import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";

// Component
import Title from "../Title";

// Styles
import "./banner.css";
import { getImagePath } from "../../util/commonUtil";

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
          bannerdata.banner_descripiton && bannerdata.banner_title
            ? "titleCaption d-flex align-items-end justify-content-end flex-column"
            : ""
        }
      >
        {bannerdata.banner_title === "" ?  "" :
          <Title title={bannerdata.banner_title} cssClass="text-end text-white h3 shadow-lg" />
        }
        {bannerdata.banner_subTitle === "" ?  "" :
        <Title title={bannerdata.banner_subTitle} cssClass="text-end text-muted h5 fw-normal shadow-lg" />
        }
        {bannerdata.banner_descripiton === "" ?  "" :
          <small className="text-end text-muted d-block w-50">{bannerdata.banner_descripiton}</small>
         }
      </div>
      <img
        src={bannerdata.path ? getImagePath(bannerdata.path) : ""}
        alt={bannerdata.alternitivetext}
        className="w-100"
      />
    </div>
  );
};
export default Banner;
