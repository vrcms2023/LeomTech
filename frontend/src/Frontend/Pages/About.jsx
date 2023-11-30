import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import BriefIntro from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from '../../Admin/Components/BriefIntro/index'
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";

import { removeActiveClass } from "../../util/ulrUtil";

import Img1 from "../../Images/project1.png";
import Img2 from "../../Images/future.png";
import Img3 from "../../Images/quality.png";
import AboutBanner from '../../Images/Banner_12.jpg'
import Banner from "../../Common/Banner";

const About = () => {

  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const [admin, setAdmin] = useState(true);
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

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {admin ? <EditIcon editHandler={() => editHandler("banner", true)} /> : "" }
         <Banner bannerImg={AboutBanner} alt="About LeomTech" title={'Leom Tech'} caption={'IT Consulting Services'}/>
      </div>

      {/* Introduction */}
      {admin ? <EditIcon editHandler={() => editHandler("briefIntro", true)} /> : "" }
      
      <BriefIntro title="Welcome To LeomTech">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro>

      
      <div className="container my-md-5 py-md-4">
        {admin ? <EditIcon editHandler={() => editHandler("about", true)} /> : "" } 
        <div className="row shadow-lg">
          <div className="col-12 col-md-8  py-4 p-md-5">
            <img
              src={Img1}
              alt=""
              className="d-md-none w-100 mb-3 shadow-md rounded-2"
            />
            <Title title="About HPR Infra" cssClass="text-dark fs-4" />
            <p>
              HPR has ventured in the real estate world with a humble beginning
              in the year 2004, with Director D. Hari Srinivas who has vision
              and has successfully completed several projects in Hyderabad.
              Riding on the growth wave of real-estate, the group has
              diversified strategically into the development of land.
            </p>
            <p>
              Adibhatla, a village in R.R.District, Telangana is most talked
              about prominent place for investmentsin plots and lands for future
              appreciation.
            </p>
            <p>
              The village is adjacent to ORR in between Nagarjuna Sagar Highway
              and Sri Salilam Highway.
            </p>
            <p className="">
              Abibaltla had become prominent because of IT SEZ & Aero Space SEZ.
              TCS, CTS, and small other companies had been allotted land in IT
              SEZ. TCS, which is about to complete the construction is expected
              to generate an employment of 27,000 employees in Adibatla Campus.
            </p>
            <p>
              Tata Advanced Systems, a group company of Tata’s started their
              manufacturing facility for Helicopter units, wings manufacturing
              in collaboration with LOCKHEED MARTIN and SIKORSKY AIRCRAFT
              CORPORATION in the Aerospace SEZ, Adibatla.
            </p>
            <p>
              SAMUHA Engineering a cluster of small manufacturing ancillary
              units had started theri operation in Aerospace SEZ. Samuha
              Engineering is expected to generate an employment of 10,000
              employees.
            </p>
            <p>
              In addition to the above companies at Adibhatla, there is
              developed land available in Fab City on Srisailam Highway,
              Thukkuguda. Celkon, a mobile company had expressed their
              willingness to start their manufacturing operation at Fab City.
              Telangan Govt. Is in talks with Various mobile manufacturing
              companies to set up their establishments in Fab city.
            </p>
            <p>
              Airport at Shamshabad is hardly 15 minutes drive from Thukkuguda.
            </p>
            <p>
              Hardware Park, near Thukkuguda is already holding so many
              companies creating an employment of 3000.
            </p>
            <p>
              The ITIR project announced by the Central Govt. is expected to
              further fuel the growth in this area. News related to this project
              can be viewed in the links provided below.
            </p>
          </div>
          <div className="col-12 col-md-4 d-none d-md-block p-0 ">
            <img
              src={Img1}
              alt=""
              className="w-100 h-100"
              style={{ objectFit: "cover", backgroundPosition: "center" }}
            />
          </div>
        </div>

        {admin ? <EditIcon editHandler={() => editHandler("vision", true)} /> : "" }
        <div className="row shadow-lg my-5">
          <div className="col-12 col-md-4 d-none d-md-block p-0 ">
            <img
              src={Img2}
              alt=""
              className="w-100 h-100"
              style={{ objectFit: "cover", backgroundPosition: "center" }}
            />
          </div>
          
          <div className="col-md-8  py-4 p-md-5">
            <img
              src={Img2}
              alt=""
              className="d-md-none w-100 mb-3 shadow-md rounded-2"
            />
            <Title title="Our Vision" cssClass="text-dark fs-4" />
            <p>
              Our vision and intent now encompass to not just build better homes
              or offices, but to provide a better quality of life for people who
              are a part of any facility which the Group has created. The focus
              is to strive to impart better quality through the development of
              world-class neighborhoods, which will enrich the lives of anyone
              living or working within these self-contained environs.
            </p>
          </div>
        </div>

        {admin ? <EditIcon editHandler={() => editHandler("mission", true)} /> : "" }
        <div className="row shadow-lg">
        
          <div className="col-12 col-md-8 py-4 p-md-5">
            <img
              src={Img3}
              alt=""
              className="d-md-none w-100 mb-3 shadow-md rounded-2"
            />
            <Title
              title="What makes us a futuristic group?"
              cssClass="text-dark fs-4"
            />
            <p className="lh-lg">
              <strong>To excel in delivery of work.</strong>
              <br />
              <strong>
                To adhere to the highest standards of professional ethics.
              </strong>
              <br />
              <strong> To introduce several ‘firsts’ in the industry.</strong>
            </p>
            <p>
              To maintain transparency with our Investors, Associates, Clients,
              Service Providers, Employees and contribute to the society at
              large.
            </p>
          </div>
          <div className="col-12 col-md-4 d-none d-md-block p-0">
            <img
              src={Img3}
              alt=""
              className="w-100  h-100"
              style={{ objectFit: "cover", backgroundPosition: "center" }}
            />
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

export default About;
