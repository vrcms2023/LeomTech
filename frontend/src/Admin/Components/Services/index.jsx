import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../../Common/Button";
import {Link} from 'react-router-dom'
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import Error from "../Error";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";

import './services.css'

const AddService = ({ setSelectedServiceProject, selectedServiceProject }) => {
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [userName, setUserName] = useState("");
  const onPageLoadAction = useRef(true);

  const onChangeHandler = (event) => {
    setError("");
    setServiceName(event.target.value);
  };


  const onClickSelectedService = (item) =>{
    setSelectedServiceProject(item)
  }

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  /**
   * Add Service handler
   */
  async function submitHandler(event) {
    if (serviceName === "") {
      setError("Please Enter Service  name");
      return;
    }
    try {
      const response = await axiosServiceApi.post(`/services/createService/`, {
        services_page_title: serviceName,
        created_by: userName,
        updated_by: userName,
        publish: false,
      });

      if (response?.status == 201) {
        toast.success(`${serviceName} service is created `);
        setServiceName("");
        getServiceList();
        setSelectedServiceProject(response.data.services);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(`${serviceName} is already register`);
      toast.error(`${serviceName} is already register`);
    }
  }

  const getServiceList = async () => {
    try {
      const response = await axiosServiceApi.get(`/services/createService/`);
      console.log(response, "Services")
      if (response?.status === 200) {
        setServiceList(response.data.services);
        if (onPageLoadAction.current) {
          setSelectedServiceProject(response.data.services[0]);
          onPageLoadAction.current = false;
        }
      }
    } catch (e) {
      console.log("unable to access ulr because of server is down");
    }
  };

  // const generateDropDownlist = (data) => {
  //   return data.map((item) => {
  //     return {
  //       label: item.services_page_title,
  //       value: item.id,
  //     };
  //   });
  // };

  /**
   *  update Service name list on service list update
   */
  // useEffect(() => {
  //   if (serviceList.length > 0) {
  //     setServiceNameList(generateDropDownlist(serviceList));
  //   }
  // }, [serviceList]);

  /**
   *  get Service list on page load
   */
  useEffect(() => {
    getServiceList();
  }, []);



  const publishService = async () => {
 
    try {
      let response = await axiosServiceApi.patch(
        `/services/publishService/${selectedServiceProject.id}/`,
        { publish: !selectedServiceProject.publish },
      );

      if (response.status === 200) {
        toast.success(`Service published successfully`);
        setSelectedServiceProject(response.data.services);
      }
    } catch (error) {
      console.log("unable to publish the services");
    }
  };

  const deleteService = () => {

    const id = selectedServiceProject.id;
    const name = selectedServiceProject.services_page_title;
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `services/updateService/${id}/`,
      );
      if (response.status == 204) {
        const list = serviceList.filter((item) => item.id !== id);
        setServiceList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };

  return (
    <div className="my-5">

<h3 className={`text-center `}>Add New Service </h3>

      {/* <h3 className={`text-center ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''} `}>Add New Service </h3> */}

      <div className={`container bg-light p-5 border shadow-lg`}>
      {/* <div className={`container bg-light p-5 border shadow-lg ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''}`}> */}
        <div className="row">
          {error ? <Error>{error}</Error> : ""}
          <div className="col-md-7 text-center">
          
            <input
              type="text"
              class="form-control py-2"
              name="services_page_title"
              id=""
              value={serviceName}
              placeholder="Add Service Name"
              onChange={onChangeHandler}
            />

            <Button
              type="submit"
              cssClass="btn btn-lg btn-primary mt-3"
              handlerChange={submitHandler}
              label="Save"
            />
            </div>

            <div className="col-md-5 mt-5 mt-md-0 servicePageLinks">
              <Title title="Services Pages" cssClass="fs-6 fw-bold text-center border-bottom pb-2 mb-2 " />
            <ul>
            {serviceList && serviceList.map((item, index) => (
              <li className="d-flex justify-content-between py-1 cursor-pointer" key={item.id} onClick={(event) => onClickSelectedService(item)}>
                <div className="fw-bold ">{item.services_page_title} </div>
                <div>
                <Link onClick={publishService} className={`p-1 px-3 mx-2 rounded ${item.publish ? "bg-success text-white" : "bg-secondary text-dark"}`}>
                    <small>{item.publish ? "Published" : "Un Publish"}</small>
                  </Link>
                  <Link onClick={deleteService}> <i class="fa fa-trash-o text-danger fs-4" aria-hidden="true"></i></Link>
                  
                </div>
              </li>
              ))}
            </ul>
            {/* <Button
              type="Delete"
              cssClass="btn btn-lg btn-primary"
              handlerChange={deleteService}
              label="Delete Service"
            /> */}
              {/* <Button
              type="Publish"
              cssClass="btn btn-lg btn-warning"
              handlerChange={publishService}
              label="publish Service"
            /> */}

            {/* <hr className="my-5" /> */}
            {/* <span className="text-success text-center fw-bold py-2 fs-5 d-block">
              Successfully added the new service
            </span> */}
            {/* {selectError ? <Error>{selectError}</Error> : ""}
            <select
              class="form-select py-3"
              aria-label="Default select example"
              defaultValue={"standard"}
              value={selectedServiceProject?.id}
              onChange={selectOnChangeHandler}
            >
              <option selected>Open this select menu</option>
              {serviceNameList.map((option, index) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
