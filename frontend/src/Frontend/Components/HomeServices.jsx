import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles
import "./HomeServices.css";

import serviceImg1 from "../../Images/service1.png";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ServiceForm from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import ModelBg from "../../Common/ModelBg";
import EditIcon from "../../Common/AdminEditIcon";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { mapServicePagetoComponent, sortByDate, sortByDateFIFO } from "../../util/dataFormatUtil";
import { getImagePath } from "../../util/commonUtil";

const HomeServices = ({ title }) => {
  const editComponentObj = {
    service: false,
  };

  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [clientServiceList, setClientServiceList] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    getClinetServiceList()
  },[])

  const getClinetServiceList = async () => {
    try {
      
      let response = await axiosClientServiceApi.get(
        `/services/getClientHomePageService/`,
      );
      
      let data = mapServicePagetoComponent(response.data)
          setClientServiceList(data);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };
  

  return (
    <>
      {clientServiceList.map((servicelist, index) => 
        servicelist?.service.map((item) => (
        <div className="row service mb-4" key={`${index}+homeService`}>
          <div className="position-relative">
            {/* {isAdmin ? (
              <EditIcon editHandler={() => editHandler("service", true)} />
            ) : (
              ""
            )} */}
          </div>
          <div className="col-md-6 p-2">
            <img src={item.path ? getImagePath(item.path) : serviceImg1} alt={item.alternitivetext} className="img-fluid w-100 h-100" />
          </div>
          <div className="col-md-6 p-4">
            <Title title={item.feature_title} cssClass="fs-3 fw-bold" />
            {item.feature_description ? (
                <div dangerouslySetInnerHTML={{ __html: item.feature_description }} />
              ) : (
                ""
              )}
            <Link to={`/services/${item.serviceID}/`} className="btn btn-primary mt-4">
              Know More
            </Link>
          </div>
        </div>
      )))}

      {componentEdit.service ? (
        <div className="adminEditTestmonial">
          <ServiceForm editHandler={editHandler} componentType="service" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default HomeServices;
