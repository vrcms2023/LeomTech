import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Button from "../Button";
import { getCookie, removeAllCookies } from "../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import AdminHeader from "../../Admin/Components/Header";

import ModalBg from "../../Common/ModelBg";
import EditIcon from "../AdminEditIcon";
import { hideHandBurgerIcon } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Styled Components
import { StyledMenu } from "../StyledComponents/Styled-NavMenu";

// Styles
import "./Styles.css";

// Images
import Logo from "../../Images/logo.svg";
import { axiosClientServiceApi } from "../../util/axiosUtil";

const Header = () => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loginState, setLoginState] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const pathList = [
    "/login",
    "/register",
    "/authForm",
    "/main",
    "/dashboard",
    "/addproject",
    "/editproject/",
    "/adminnews",
    "/testimonial",
    "/userAdmin",
  ];
  const isHideMenu = hideHandBurgerIcon(pathList);

  const burgetHide = [
    "/login",
    "/register",
    "unauthorized",
    "activate",
    "reset_password",
    "authForm",
    "resend_activation",
    "password",
  ];
  const isHideBurgetIcon = hideHandBurgerIcon(burgetHide);
  const [selectedServiceProject, setSelectedServiceProject] = useState({});
  const [serviceMenuList, setserviceMenuList] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (userInfo || getCookie("access")) {
      setLoginState(true);
      const uName = userInfo ? userInfo.userName : getCookie("userName");
      setUserName(uName);
    } else {
      setLoginState(false);
      setUserName("");
    }
  }, [userInfo]);

  const getServiceMenuPage = async () => {
    try {
      let response = await axiosClientServiceApi.get(
        `/services/getSelectedClientService/${selectedServiceProject.id}/`,
      );
      // setSelectedServiceList(response.data.servicesFeatures);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };


  useEffect(() => {

    const getServiceMenuList = async () => {
      try {
        const response = await axiosClientServiceApi.get(`/services/clientServiceList/`);
        if (response?.status === 200) {
          console.log("response", response.data)
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getServiceMenuList()
  },[])

  const links = document.querySelectorAll("#navbarSupportedContent li");
  const nestedLinks = document.querySelectorAll("#navbarSupportedContent li ul li");
  const menu = document.getElementById("navbarSupportedContent");

  // on clicking of menu Item Menu will be hided
  links.forEach((item) => {
    item.addEventListener("click", function () {
      // menu.classList.remove("show");
    });
  });

  nestedLinks.forEach((item) => {
    item.addEventListener("click", function () {
      menu.classList.remove("show");
    });
  });

  function logOutHandler() {
    removeAllCookies();
    setLoginState(false);
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  }
  return (
    <>
      {componentEdit.menu ? (
        <div className="adminEditTestmonial">
          <AdminHeader editHandler={editHandler} />
        </div>
      ) : (
        ""
      )}
      <nav
        className={
          isAdmin
            ? "navbar navbar-expand-lg navbar-dark"
            : "navbar navbar-expand-lg navbar-dark"
        }
      >
        <div className="container">
          <Link to={isHideMenu ? "#" : "/"} className="navbar-brand logo">
            <img src={Logo} alt="" />
          </Link>

          {/* LOGO EDIT OPTION */}
          {/* {isAdmin ? (
            <EditIcon editHandler={() => editHandler("menu", true)} />
          ) : (
            ""
          )} */}

          {!isHideBurgetIcon ? (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : (
            ""
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ClientMenu />
          </div>
        </div>
      </nav>
      {show && <ModalBg />}
    </>
  );
};

export const AdminMenu = ({ userName, logOutHandler }) => {
  return (
    <>
      <ul className="mt-4 navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="text-dark text-capitalize d-flex justify-content-center align-items-center">
          {userName ? (
            <>
              <i
                className="fa fa-user-circle-o fs-1 text-secondary me-2 "
                aria-hidden="true"
              ></i>{" "}
              {userName}
            </>
          ) : (
            ""
          )}
        </li>
        <li className="nav-item mx-3">
          <Button
            type="submit"
            cssClass="btn border border-secondary fw-bold ms-3"
            label="Logout"
            handlerChange={logOutHandler}
          />
        </li>
      </ul>
    </>
  );
};
export const ClientMenu = () => {
  return (
    <StyledMenu>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
        <li className="nav-item">
          <NavLink
            to="/"
            className={useCallback(({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link",
            )}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            AboutUs
          </NavLink>
        </li>
        {/* <li className="nav-item dropdown">
        <NavLink
          id="projectLink"
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-Link active" : "nav-Link"
          }
        >
          Projects
        </NavLink>
      </li> 
      <li className="nav-item">
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive ? "nav-Link active" : "nav-Link"
          }
        >
          Gallery
        </NavLink>
      </li> */}

        <li className="nav-item dropdown">
          <NavLink
            id="navbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
            to="/leomservices"
            className={useCallback(({ isActive }) =>
              isActive
                ? "nav-Link dropdown-toggle active"
                : "nav-Link dropdown-toggle",
            )}
          >
            Services
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link to="/services" className="dropdown-item">
                IoT Services{" "}
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                AI Services Two
              </Link>
            </li>
            {/* <li>
              <Link to="#" className="dropdown-item">
                Project Planning{" "}
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                Project development and maintenance{" "}
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                Project development and maintenance{" "}
              </Link>
            </li> */}

            {/* <li><Link to="/services" className="dropdown-item">IoT Services </Link></li>
            <li><Link to="#" className="dropdown-item">AI Services Two</Link></li>
            <li><Link to="#" className="dropdown-item">Project Planning </Link></li>
            <li><Link to="#" className="dropdown-item">Project development and maintenance </Link></li>
            <li><Link to="#" className="dropdown-item">Project development and maintenance </Link></li> */}
          </ul>
        </li>
        <li className="nav-item">
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Careers
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink
            id="navbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
            to="khub"
            className={useCallback(({ isActive }) =>
              isActive
                ? "nav-Link dropdown-toggle active"
                : "nav-Link dropdown-toggle",
            )}
          >
            KnowledgeHub
          </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link to="/News" className="dropdown-item">
                News
              </Link>
            </li>
            <li>
              {/* <Link to="#" className="dropdown-item">
                Testimonials
              </Link> */}
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </StyledMenu>
  );
};

export default Header;
