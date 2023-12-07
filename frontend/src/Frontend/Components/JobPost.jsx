import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

// Components
import Title from "../../Common/Title";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import JobPostFrom from "../../Admin/Components/forms/JobpostForm";

// Styles
import "./JobPost.css";

const JobPost = () => {
  const jobPosts = [
    {
      location: "Stafford, VA",
      title: "QUALITY CONTROL SPECIALIST III",
      subTitle: "Job Description",
      exp: "2 - 10 Years",
      postedDate: "1",
    },
    {
      location: "Stafford, VA",
      title: "Logisticks Analyst",
      subTitle: "Job Description",
      exp: "12 Years",
      postedDate: "7",
    },
    {
      location: "Stafford, VA",
      title: "Data Engineer",
      subTitle: "Job Description",
      exp: "20 Years",
      postedDate: "2",
    },
    {
      location: "Stafford, VA",
      title: "Developer",
      subTitle: "Job Description",
      exp: "5 Years",
      postedDate: "9",
    },
    {
      location: "Stafford, VA",
      title: "React Developer",
      subTitle: "Job Description",
      exp: "2 Years",
      postedDate: "10",
    },
    {
      location: "Stafford, VA",
      title: "Fullstack Developer",
      subTitle: "Job Description",
      exp: "2 - 5 Years",
      postedDate: "22",
    },
    {
      location: "Stafford, VA",
      title: "Frontend Developer",
      subTitle: "Job Description",
      exp: "2 - 10 Years",
      postedDate: "13",
    },
    {
      location: "Stafford, VA",
      title: "Linex Administrator",
      subTitle: "Job Description",
      exp: "6 Years",
      postedDate: "20",
    },
  ];

  const editComponentObj = {
    job: false,
  };

  const [posts, setPosts] = useState(jobPosts);
  const [show, setShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {posts.map((item) => (
        <div
          className="col-sm-6 col-md-4 col-lg-3 mt-3 mt-md-5 position-relative"
          key={item.title}
        >
          {/* Page Banner Component */}
          <div className="position-relative">
            {isAdmin ? (
              <EditIcon editHandler={() => editHandler("job", true)} />
            ) : (
              ""
            )}
          </div>
          <div className="p-3 jobPost">
            <span className="d-block location mb-3">{item.location}</span>
            <Title title="QUALITY CONTROL SPECIALIST III" />
            <div className="my-3">
              <Title title="Job Description" cssClass="fs-6 fw-bold" />
              <p className="m-0">
                Peridot is seeking to hire a Quality Control Specialist to
                support an upcoming Federal contract in Quantico, VA.
              </p>
            </div>
            <span className="d-block mb-2">
              <strong>Experience</strong> {item.exp} Years
            </span>
            <small className="d-block">Posted {item.postedDate} day ago</small>
            <div className="text-end">
              <Link
                to="/career-details"
                className="stretched-link text-secondary"
              >
                <i className="fa fa-expand" aria-hidden="true"></i>
              </Link>
            </div>
            {isAdmin ? (
              <div className="mt-3 text-end deletePost">
                <Link to="" className="bg-danger p-2 rounded">
                  <i
                    className="fa fa-trash-o fs-5 text-white"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}

      {componentEdit.job ? (
        <div className="container position-fixed adminEditTestmonial p-1">
          <JobPostFrom editHandler={editHandler} componentType="job" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default JobPost;
