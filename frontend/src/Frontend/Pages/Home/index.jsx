import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import Carousel from "../../Components/Carousel";
import Title from "../../../Common/Title";
import ModelBg from "../../../Common/ModelBg";

import { Link } from "react-router-dom";

// Edit Components

import AdminBanner from '../../../Admin/Components/forms/ImgTitleIntoForm-List'
import BriefIntro from '../../../Admin/Components/BriefIntro/'

import "./Home.css";


import imgOngoing from "../../../Images/ongoing.png";
import imgCompleted from "../../../Images/completed.png";
import imgFuture from "../../../Images/future.png";

import { axiosClientServiceApi } from "../../../util/axiosUtil";
import Testimonials from "../../Components/Testimonials";
import { removeActiveClass } from "../../../util/ulrUtil";

import EditIcon from "../../../Common/AdminEditIcon";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
  };

  const [testimonis, setTestmonis] = useState([]);
  const [admin, setAdmin] = useState(true);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  }

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {

      try{
          const response = await axiosClientServiceApi.get(
            `/testimonials/clientTestimonials/`,
          );
          if (response?.status == 200) {
            setTestmonis(response.data.testimonial);
          }
      } catch(e){
        console.log("unable to access ulr because of server is down")
      }
    };
    getTestimonial();
  }, []);

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 p-0 carousel">
          {admin ? <EditIcon editHandler={() => editHandler("carousel", true)} /> : "" }
          
          <Carousel />
        </div>
      </div>

      {/* Introduction */}

      {admin ? <EditIcon editHandler={() => editHandler("briefIntro", true)} /> : "" }
      <div className="row py-3 introGrayBg">
        <div className="col-md-8 offset-md-2 px-4 py-2 py-md-4">
          <Title
            title="To excel in delivery of work!"
            cssClass="mb-2 fw-normal fs-2 text-center green-700"
          />
          <p className="text-center lh-md m-0">
            We believe that construction is a man made wonder. The thought of
            bringing imagination to real life structures excites us, each day
            the passion in us grows as we contribute to this industry.
          </p>
        </div>

        
      </div>

      {/* Edit Project */}
      {admin ? <EditIcon editHandler={() => editHandler("projects", true)} /> : "" }
        {/* End Of Edit Project */}
      <div className="row my-5 homeProjectsBg">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img
                    src={imgOngoing}
                    className="card-img-top"
                    alt="Ongoing Projects"
                  />
                  <div className="card-body">
                    <Title title="Working Projects" cssClass="blue-900" />
                    <p className="card-text mb-4">
                      We believe that construction is a man made wonder. The
                      thought of bringing imagination to real life structures
                      excites us, each day the passion in us grows as we
                      contribute to this industry.
                    </p>
                    <Link to="/projects">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4 my-3 my-md-0">
                <div className="card cardGreenBg">
                  <img
                    src={imgFuture}
                    className="card-img-top"
                    alt="Completed Projects"
                  />
                  <div className="card-body">
                    <Title
                      title="Future Projects"
                      cssClass="text-white blue-900"
                    />
                    <p className="card-text mb-4">
                      We believe that construction is a man made wonder. The
                      thought of bringing imagination to real life structures
                      excites us, each day the passion in us grows as we
                      contribute to this industry.
                    </p>
                    <Link to="/projects">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <img
                    src={imgCompleted}
                    className="card-img-top"
                    alt="Future Projects"
                  />
                  <div className="card-body">
                    <Title title="Completed Projects" cssClass="blue-900" />
                    <p className="card-text mb-4">
                      We believe that construction is a man made wonder. The
                      thought of bringing imagination to real life structures
                      excites us, each day the passion in us grows as we
                      contribute to this industry.
                    </p>
                    <Link to="/projects" className="">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row homeSections">
      
        <div className="col-md-6 ourCulture">
          <Title
            title="Our Culture"
            cssClass="mb-2 fw-normal text-center text-white title"
          />
          <Title
            title="Compassion, Innovation, Trust"
            cssClass="mb-2 fw-normal fs-5 text-center text-black subTitle"
          />
          <p className="text-center text-white lh-md ">
            In our company, we attain to serve you as best as we can in a timely
            fashion and with assurance that your needs will be satisfied. From
            initial site studies, to design, to construction and commissioning,
            we stand by our clients as technical experts throughout the
            development cycle.
          </p>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-8 col-md-6 p-4 d-flex justify-content-center align-items-start flex-column borderBottom">
              <Title
                title="Professional Service"
                cssClass="mb-2 fw-bold title gray-444"
              />
              <p className="lh-md gray-222">
                ‘Best in class’ service ensured with our experienced in-house
                Design & Construction team. Complete Hassle-free Experience from
                beginning to end.
              </p>
            </div>
            <div className="col-4 col-md-6 professional"></div>
            <div className="col-4 col-md-6 quality"></div>
            {/* <hr className='d-md-none'/> */}
            <div className="col-8 col-md-6 p-4 d-flex justify-content-center align-items-start flex-column borderBottom">
              <Title
                title="Quality Assurance"
                cssClass="mb-2 fw-bold title gray-444"
              />
              <p className="lh-md gray-222">
                Be ensured with us that you have the ‘right quality for the
                right price’. No more over charging and no more substandard
                products.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {/* <hr className='d-md-none'/> */}
            <div className="col-8 col-md-6 p-4 d-flex justify-content-center align-items-start flex-column borderBottom">
              <Title
                title="100% transparency"
                cssClass="mb-2 fw-bold title gray-444"
              />
              <p className="lh-md gray-222">
                No Hidden Charges, Every detail is as clear as a crystal. To
                bring in transparency is one of our core purposes of existence.
              </p>
            </div>
            <div className="col-4 col-md-6 transparency"></div>
            <div className="col-4 col-md-6 insured"></div>
            {/* <hr className='d-md-none'/> */}
            <div className="col-8 col-md-6 p-4 d-flex justify-content-center align-items-start flex-column borderBottom">
              <Title
                title="Insured Work"
                cssClass="mb-2 fw-bold title gray-444"
              />
              <p className="lh-md gray-222">
                Your Structure is insured with us. Any issue- post construction,
                no need to worry. We have your back; we are always available at
                a click/call away.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 p-5 testimonials text-center">
        {admin ? <EditIcon editHandler={() => editHandler("testmonial", true)} /> : "" }
       
        {/* End Of Edit Testimonials */}
          <Testimonials testimonis={testimonis} />
        </div>
        
      </div>
    </div>

    {componentEdit.carousel ? 
      <div className='container position-absolute adminEditTestmonial p-1'>
        <AdminBanner editHandler={editHandler} componentType="carousel" />
      </div> 
    : ""}

    {componentEdit.briefIntro ? 
      <div className='container position-fixed adminEditTestmonial p-1'>
        <BriefIntro editHandler={editHandler} componentType="briefIntro" />
      </div>
    : ""}

    {componentEdit.projects ? 
      <div className='container position-fixed adminEditTestmonial p-1'>
        <AdminBanner editHandler={editHandler} componentType="projects" />
      </div>
    : ""}

    {componentEdit.testmonial ? 
      <div className='container position-fixed adminEditTestmonial p-1'>
        <AdminBanner editHandler={editHandler} componentType="testmonial" />
      </div>
    : ""}

    {show && <ModelBg />}
    </>
  );
};

export default Home;
