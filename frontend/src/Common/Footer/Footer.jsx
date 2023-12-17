import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosClientServiceApi } from "../../util/axiosUtil";
// Components
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

import EditIcon from "../AdminEditIcon";

// import Model from "../Model";
// import ModelBg from "../ModelBg";

import Logo from "../../../src/Images/logo.svg";

import "./Styles.css";
import Model from "../../Common/Model";
import ModelBg from "../ModelBg";
import FooterAdminFeilds from "../../Admin/Components/forms/FooterInputs";
import ContactInputs from "../../Admin/Components/forms/ContactInputs";
import AdminTermsPolicy from "../../Admin/Components/TermsPrivacy/index";

const Footer = () => {
  const editComponentObj = {
    termsPolacy: false,
    address: false,
    contact: false,
    social: false,
  };

  const [footerValues, setFooterValues] = useState(false);
  const [show, setShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [termsAndConditionData, setTermsAndConditionData] = useState(false);
  const privacyPolacyObj = {
    title: "Privacy Policy",
    dec: "Personal Information: Some personal information including name, contact numbers, e-mail addresses, and other demographic information is collected through enquiry forms. HPR Infra Group takes precautions to protect your individual / personal information from unauthorized use and makes internal use of your contact information only to inform you of projects and services that may interest you. When you voluntarily send us electronic mail, we will keep a record of this information so that we can respond to you. However, we do not disclose your information to other public bodies or individuals except as authorized by law. \n\n As you travel through the HPR Infra Projects website, our servers log information about your session. Information logged includes items such as your IP address, what browser you are using, the time and date you visited, how long your session lasted, and what pages you visited. We use this information from our server logs primarily to learn about our visitors as a group, to track visitors and readership on our website.\n\n HPR INFRA Group reserves the right to change this policy in any manner at any time without prior notice. If we make material changes to our privacy policy, the same will be updated on the website.",
    cr: "Copyright",
    crm: "The content on this website is the exclusive property of The HPR INFRA GROUP",
  };

  const showModel = () => {
    setModelShow(!modelShow);
  };
  const closeModel = () => {
    setModelShow(!modelShow);
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `footer/getClientAddress/`,
        );
        if (response?.data?.address?.length > 0) {
          setFooterValues(response.data.address[0]);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.address) {
      getFooterValues();
    }
  }, [componentEdit.address]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/footer/getTermsAndCondition/`,
        );
        if (response?.data?.terms?.length > 0) {
          setTermsAndConditionData(response?.data?.terms[0])
        }
      } catch (error) {
        console.log("unable to save the terms and condition form");
      }
    };
    if(!componentEdit.termsPolacy){
      getFooterValues();
    }
   
  }, [componentEdit.termsPolacy]);

  return (
    <>
      <footer className="text-center">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 text-center text-md-start">
              <h5>Company</h5>
              <ul className="">
                <li>
                  <Link to="/" className="ms-0">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="/news">News & Updates</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="" onClick={showModel}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="d-block d-md-none" />
            <div className="col-md-3 pb-3 pb-md-0">
              {isAdmin ? (
                <EditIcon editHandler={() => editHandler("address", true)} />
              ) : (
                ""
              )}

              <div className="text-center text-md-start">
                <h5>Address</h5>
                {footerValues.address_dr_no}, {footerValues.location} <br />
                {footerValues.street} <br />
                {footerValues.city} - {footerValues.postcode} <br />
                {footerValues.state}
              </div>
            </div>

            <hr className="d-block d-md-none" />
            <div className="col-md-3 text-center text-md-start pb-3 pb-md-0">
              <h5>Reach Us</h5>
              <div>
                Phone
                <br />
                {footerValues.phonen_number} <br />
                {footerValues.phonen_number_2}
              </div>
              <div className="mb-md-0 mt-3">
                Email
                <br />
                <a href={`mailto:${footerValues.emailid}`}>{footerValues.emailid} </a>
              </div>
            </div>

            <hr className="d-block d-md-none" />
            <div className="col-md-3 text-center socialLinks ">
              <img src={Logo} alt="" />
              <div>
                {footerValues.facebook_url ? (
                  <Link to={footerValues.facebook_url} target="_blank">
                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.twitter_url ? (
                  <Link to={footerValues.twitter_url} target="_blank">
                    <i className="fa fa-twitter-square" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.youtube_url ? (
                  <Link to={footerValues.youtube_url} target="_blank">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.linkedIn_url ? (
                  <Link to={footerValues.linkedIn_url} target="_blank">
                    <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.instagram_url ? (
                  <Link to={footerValues.instagram_url} target="_blank">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.vimeo_url ? (
                  <Link to={footerValues.vimeo_url} target="_blank">
                    <i className="fa fa-vimeo" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}

                {footerValues.pinterest_url ? (
                  <Link to={footerValues.pinterest_url} target="_blank">
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-3 footerCopyRights">
          {isAdmin ? (
            <EditIcon editHandler={() => editHandler("termsPolacy", true)} />
          ) : (
            ""
          )}
          Copyrights 2023 - All rights reserved
          {/* Terms & Conditions popup data = {termsAndConditionData.terms_condition}
          Privacy Policy  popup data = {termsAndConditionData.privacy_policy} */}
          {console.log({
            terms : termsAndConditionData.terms_condition,
            privacyPolacyObj : termsAndConditionData.privacy_policy
          })}
          <span className="d-inline-block mx-2">|</span>
          <Link to="">Terms & Conditions</Link>{" "}
          <span className="d-inline-block mx-2">|</span>
          <Link to="">News Updates</Link>
          <span className="d-block mt-2 dby">
            designed by{" "}
            <a href="http://www.varadesigns.com">
              <small className="p-1 fw-bold d-inline-block ">
                VARA-DESIGNS
              </small>
            </a>
          </span>
        </div>
      </footer>

      {modelShow && (
        <Model
          obj={""}
          privacy={privacyPolacyObj}
          closeModel={closeModel}
          flag="footer"
        />
      )}

      {componentEdit.address ? (
        <div className="adminEditTestmonial">
          <FooterAdminFeilds
            editHandler={editHandler}
            componentType="address"
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.termsPolacy ? (
        <div className="adminEditTestmonial">
          <AdminTermsPolicy
            termsAndConditionData={termsAndConditionData}
            editHandler={editHandler}
            componentType="termsPolacy"
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.contact ? (
        <div className="adminEditTestmonial">
          <ContactInputs editHandler={editHandler} componentType="contact" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};
export default Footer;
