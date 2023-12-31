import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";

// Component
import Title from "../Title";

// Styles
import "./banner.css";
import { getImagePath } from "../../util/commonUtil";

const Banner = ({ getBannerAPIURL, bannerState, pageLoadServiceName }) => {
  const [bannerdata, setBannerData] = useState([]);
  const baseURL = getBaseURL();

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status == 200) {
          setBannerData(response.data.imageModel);
        } else {
          setBannerData({});
        }
      } catch (error) {
        setBannerData({});
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!bannerState) {
      getBannerData();
    }
  }, [bannerState, pageLoadServiceName]);

  return (
    <div className="pageBanner">
      <div
        className={
          (bannerdata.banner_descripiton && bannerdata.banner_title) ||
          bannerdata.banner_descripiton ||
          bannerdata.banner_title
            ? "titleCaption d-flex align-items-end justify-content-end flex-column"
            : ""
        }
      >
        {bannerdata.banner_title === "" ? (
          ""
        ) : (
          <Title
            title={bannerdata.banner_title}
            cssClass="title text-end text-white fs-2"
          />
        )}
        {bannerdata.banner_subTitle === "" ? (
          ""
        ) : (
          <Title
            title={bannerdata.banner_subTitle}
            cssClass="subTitle text-end text-white fw-normal"
          />
        )}
        {bannerdata.banner_descripiton === "" ? (
          ""
        ) : (
          <small className="description text-end text-white d-block mt-2 fs-6">
            {bannerdata.banner_descripiton}
          </small>
        )}
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
