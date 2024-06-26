import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { getFooterValues } from "../../features/footer/footerActions";
import { getCookie } from "../../util/cookieUtil";
import { urlStringFormat } from "../../util/commonUtil";
import { getAddressList } from "../../features/address/addressActions";

const Footer = () => {
  const editComponentObj = {
    termsPolacy: false,
    address: false,
    contact: false,
    social: false,
  };

  const [footerValues, setFooterValues] = useState(false);
  const [address, setAddress] = useState({});
  const [show, setShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [termsAndPolicyData, setTermsAndPolicyData] = useState({});
  const [termsAndConditionData, setTermsAndConditionData] = useState({});
  const { footerData, error } = useSelector((state) => state.footerData);
  const { addressList } = useSelector((state) => state.addressList);
  const dispatch = useDispatch();

  const date = new Date();
  const fullYear = date.getFullYear();

  useEffect(() => {
    if (footerData?.length === 0) {
      dispatch(getFooterValues());
    }
  }, []);

  useEffect(() => {
    if (!componentEdit.address && footerData?.address?.length > 0) {
      dispatch(getFooterValues());
    }
  }, [componentEdit.address]);

  useEffect(() => {
    if (footerData?.address?.length > 0) {
      setFooterValues(footerData.address[0]);
    }
  }, [footerData]);

  useEffect(() => {
    if (addressList?.length === 0) {
      dispatch(getAddressList());
    }
  }, []);

  useEffect(() => {
    if (addressList?.addressList?.length > 0) {
      setAddress(addressList.addressList[0]);
    }
  }, [addressList]);

  const showModel = (type) => {
    console.log(termsAndConditionData);
    if (type === "PP") {
      setTermsAndConditionData({
        title: "Privacy Polacy",
        data: termsAndPolicyData.privacy_policy,
      });
    } else {
      setTermsAndConditionData({
        title: "Terms And Conditions",
        data: termsAndPolicyData.terms_condition,
      });
    }
    setModelShow(!modelShow);
  };
  const closeModel = () => {
    setModelShow(!modelShow);
  };

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/footer/getTermsAndCondition/`
        );
        if (response?.data?.terms?.length > 0) {
          setTermsAndPolicyData(response?.data?.terms[0]);
        }
      } catch (error) {
        console.log("unable to save the terms and condition form");
      }
    };
    if (!componentEdit.termsPolacy) {
      getFooterValues();
    }
  }, [componentEdit.termsPolacy]);

  return (
    <>
      <footer className="text-center">
        <div className="container py-5 footerDetails">
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
                  <Link
                    to={`/services/${urlStringFormat(
                      getCookie("pageLoadServiceName")
                    )}/`}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/news">News & Updates</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                {/* <li>
                  <Link to="" onClick={showModel}>
                    Privacy Policy
                  </Link>
                </li> */}
              </ul>
            </div>
            <hr className="d-block d-md-none" />
            <div className="col-md-3 pb-3 pb-md-0">
              <div className="socialLinks">
                <h5>Social Media</h5>
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
              {/* {isAdmin ? (
                <EditIcon editHandler={() => editHandler("address", true)} />
              ) : (
                ""
              )} */}

              {/* <div className="text-center text-md-start">
                <h5>Address</h5>
                <span className="d-block">{address.location_title}</span>
                <span className="d-block">{address.address_dr_no } </span>
                <span className="d-block">{address.location}</span>
                <span className="d-block">{address.street}</span>
                <span className="d-block">{address.city}</span>
                <span className="d-block">{address.state}</span>
                <span className="d-block">Pincode - {address.postcode}</span>
              </div> */}
            </div>

            <hr className="d-block d-md-none" />
            {/* <div className="col-md-3 text-center text-md-start pb-3 pb-md-0">
              <h5>Reach Us</h5>
              <div>
                <p className="text-secondary">Phone</p>

                <p className="">{address.phonen_number}</p>
                <p>
                  {address.phonen_number_2 ? (
                    <>
                      {address.phonen_number_2}{" "}
                      <i
                        className="fa fa-whatsapp text-warning fs-3 ms-2"
                        aria-hidden="true"
                      ></i>
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              {address.emailid ? (
                <div className="mb-md-0 mt-4">
                  <p className="text-secondary">Email</p>
                  <a href={`mailto:${address.emailid}`}>{address.emailid} </a>
                </div>
              ) : (
                ""
              )}
            </div> */}

            <hr className="d-block d-md-none" />
            <div className="col-md-6 text-center socialLinks d-flex justify-content-end align-items-center ">
              <img src={Logo} alt="LEOMTECH" style={{ opacity: 0.2 }} />
            </div>
          </div>
        </div>

        <div className="text-center p-3 footerCopyRights">
          {isAdmin ? (
            <EditIcon editHandler={() => editHandler("termsPolacy", true)} />
          ) : (
            ""
          )}

          <div className="d-flex justify-content-center align-items-center flex-column flex-md-row gap-1 gap-md-2">
            <small>&copy; {fullYear} - All rights reserved</small>
            <span className="d-inline-block  d-none d-md-block">|</span>
            <Link
              to=""
              className="text-decoration-underline"
              onClick={() => showModel("TC")}
            >
              Terms & Conditions
            </Link>{" "}
            <span className="d-inline-block d-none d-md-block">|</span>
            <Link
              to=""
              className="text-decoration-underline"
              onClick={() => showModel("PP")}
            >
              Privacy Policy
            </Link>
          </div>
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
          obj={termsAndConditionData}
          privacy={""}
          closeModel={closeModel}
          flag="footer"
        />
      )}

      {componentEdit.address ? (
        <div className="adminEditTestmonial">
          <FooterAdminFeilds
            editHandler={editHandler}
            componentType="address"
            footerValues={footerValues}
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.termsPolacy ? (
        <div className="adminEditTestmonial">
          <AdminTermsPolicy
            termsAndConditionData={termsAndPolicyData}
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
