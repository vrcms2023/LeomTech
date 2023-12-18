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
  const [editServiceObject, setEditServiceObject] = useState('');
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
    let response =""
    let data ={
      services_page_title: serviceName,
      created_by: userName,
      publish: editServiceObject.publish ? true : false,
    }
    try {
      if(editServiceObject?.id){
        data['id'] = editServiceObject.id;
        data['updated_by'] = userName
        response = await axiosServiceApi.put(`/services/updateService/${editServiceObject.id}/`, data);
      }else {
        response = await axiosServiceApi.post(`/services/createService/`, data);
      }
      if (response?.status == 201 || response?.status == 200) {
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


  /**
   *  get Service list on page load
   */
  useEffect(() => {
    getServiceList();
  }, []);



  const publishService = async (item) => {
 
    try {
      let response = await axiosServiceApi.patch(
        `/services/publishService/${item.id}/`,
        { publish: !item.publish },
      );

      if (response.status === 200) {
        toast.success(`Service published successfully`);
        setSelectedServiceProject(response.data.services);
        getServiceList()
      }
    } catch (error) {
      console.log("unable to publish the services");
    }
  };

  const deleteService = (item) => {

    const id = item.id;
    const name = item.services_page_title;
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `services/updateService/${item.id}/`,
      );
      if (response.status == 204) {
        const list = serviceList.filter((list) => list.id !== id);
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

  const EditService = (item) => {
    setServiceName(item.services_page_title)
    setEditServiceObject(item)
  }

  return (
    <div className="my-5 addNewServicePage">
    <Title title="Add New Service" cssClass="h5 text-center"/>


      {/* <h3 className={`text-center ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''} `}>Add New Service </h3> */}

      <div className="container bg-light border shadow-lg">
      {/* <div className={`container bg-light p-5 border shadow-lg ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''}`}> */}
        <div className="row">
          {error ? <Error>{error}</Error> : ""}
          <div className="col-md-5 px-4 py-5 bg-secondary d-flex flex-column justify-content-center align-items-center addPageForm">
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
              label={editServiceObject?.id ? "Update Service Name" :"Save"}
            />
            </div>

            <div className="col-md-7 px-4 py-3 mt-md-0 servicePageLinks">
              {/* <Title title="Pages" cssClass="fs-6 fw-bold text-center border-bottom pb-2 mb-2 " /> */}
            <ul>
            {serviceList && serviceList.map((item) => (
              <li className={`d-flex justify-content-between p-2
              ${item.id === selectedServiceProject?.id ? 'border border-2 border-success rounded shadow-lg' : ''}`
              } key={item.id} >
                <div className="w-50">
                  <Link onClick={(event) => onClickSelectedService(item)} className="fw-bold text-dark pageTitle">{item.services_page_title} </Link>
                </div>
                <div className="w-50 text-end">
                  <Link onClick={()=>publishService(item)} className={`p-1 px-2 rounded ${item.publish ? "bg-success text-white" : "bg-secondary text-light"}`}>
                    <small>{item.publish ? <i class="fa fa-thumbs-up fs-5" aria-hidden="true"></i> :  <i class="fa fa-thumbs-down" aria-hidden="true"></i>}</small>
                  </Link>
                  <Link onClick={() =>EditService(item)}> <i class="fa fa-pencil text-danger fs-4 mx-3" aria-hidden="true"></i></Link>
                  <Link onClick={() =>deleteService(item)}> <i class="fa fa-trash-o text-danger fs-4" aria-hidden="true"></i></Link>
                </div>
              </li>
              ))}
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
