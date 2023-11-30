import React, { useEffect, useState } from "react";

// Components
import BriefIntro from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from '../../Admin/Components/BriefIntro/index'
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import { removeActiveClass } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

// Images Imports
import ServicesBanner from '../../Images/Banner_8.jpg'


const Services = () => {

  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  }
  console.log("isAdmin", isAdmin)
  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin ? <EditIcon editHandler={() => editHandler("banner", true)} /> : "" }
         <Banner bannerImg={ServicesBanner} alt="About LeomTech" title={'Leom Tech'} caption={'IT Consulting Services'}/>
      </div>

      {/* Introduction */}
      {isAdmin ? <EditIcon editHandler={() => editHandler("briefIntro", true)} /> : "" }
      
      <BriefIntro title="Welcome To LeomTech">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro>

      
      <div className="container my-md-5 py-md-4">

        {isAdmin ? <EditIcon editHandler={() => editHandler("mission", true)} /> : "" }
        <div className="row">
          <div className="col-12 col-md-8 py-4 p-md-5">
            This page has to design
          </div>
          
        </div>
      </div>

      {componentEdit.banner ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <ImageInputsForm editHandler={editHandler} componentType="banner" />
        </div>
      : ""}

      {componentEdit.briefIntro ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <AdminBriefIntro editHandler={editHandler} componentType="briefIntro" />
        </div>
      : ""}

      {componentEdit.about ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <ImageInputsForm editHandler={editHandler} componentType="about" />
        </div>
      : ""}

      {componentEdit.vision ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <ImageInputsForm editHandler={editHandler} componentType="vision" />
        </div>
      : ""}

      {componentEdit.mission ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <ImageInputsForm editHandler={editHandler} componentType="mission" />
        </div>
      : ""}
      {show && <ModelBg />}
    </>
  );
};

export default Services;
