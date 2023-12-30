import React, { useState } from "react";

// Styles
import "./Search.css";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { getCookie } from "../../util/cookieUtil";

const Search = ({
  setObject,
  clientSearchURL,
  adminSearchURL,
  clientDefaultURL
}) => {

  const [searchQuery, setSearchquery]= useState('')
  const userCookie = getCookie('access')

  const onChangeInputHandler = (event) => {
    setSearchquery(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchResults()
    }
  }

  const searchResults = async() =>{
    let response
    try {
      if(searchQuery){
        response = await axiosClientServiceApi.get(`${clientSearchURL}${searchQuery}/`)
      } else if(userCookie){
        response = await axiosServiceApi.get(adminSearchURL);
      } else {
        response = await axiosClientServiceApi.get(clientDefaultURL);
      }
      let key = Object.keys(response.data);
      const data = sortCreatedDateByDesc(response.data[key])
      console.log(data)
      setObject(data);
    } catch (error) {
      console.log("Unable to get the  data");
    }
  }

  return (
    <div className="input-group mb-3 search">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        onChange={onChangeInputHandler}
        onKeyDown={handleKeyDown} 
      />
      <span className="input-group-text" onClick={searchResults}>
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </div>
  );
};

export default Search;
