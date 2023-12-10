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
import AddressTextArea from "../../Admin/Components/forms/FooterInputs";
import ContactInputs from "../../Admin/Components/forms/ContactInputs";

const Footer = () => {
  const editComponentObj = {
    address: false,
    contact: false,
    social: false,
  };
  const [footerValues, setFooterValues] = useState(false);
  const [show, setShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
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
                  <Link to="/projects">Projects</Link>
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
                101, Silicon Towers, <br />
                Image Garden Road, <br />
                Madhapur, <br />
                Hyderabad - 500081.
              </div>
            </div>

            <hr className="d-block d-md-none" />
            <div className="col-md-3 text-center text-md-start pb-3 pb-md-0">
              <h5>Reach Us</h5>
              <div>
                Phone
                <br />
                40-40036841
              </div>
              <div className="mb-md-0 mt-3">
                Email
                <br />
                <a href="mailto:info@leomtech.com">info@leomtech.com</a>
              </div>
            </div>

            <hr className="d-block d-md-none" />
            <div className="col-md-3 text-center socialLinks ">
              <img src={Logo} alt="" />
              <div>
                <Link to="#" target="_blank">
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </Link>
                <Link to="#" target="_blank">
                  <i className="fa fa-twitter-square" aria-hidden="true"></i>
                </Link>
                <Link to="#" target="_blank">
                  <i className="fa fa-youtube-play" aria-hidden="true"></i>
                </Link>
                <Link to="#" target="_blank">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </Link>
                <Link to="#" target="_blank">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-3 footerCopyRights">
          Copyrights 2023 - All rights reserved
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
        <div className="container position-fixed adminEditTestmonial p-1">
          <AddressTextArea editHandler={editHandler} componentType="address" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.contact ? (
        <div className="container position-fixed adminEditTestmonial p-1">
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
