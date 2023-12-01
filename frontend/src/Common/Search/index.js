import React from 'react'

// Styles
import './Search.css'

const Search = () => {
  return (
    <div className="input-group mb-3 search">
        <input type="text" className="form-control" placeholder="Search" aria-label="Search" />        
        <span className="input-group-text"><i className="fa fa-search" aria-hidden="true"></i></span>
    </div>
  )
}

export default Search