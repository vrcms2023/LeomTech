import React from 'react'

// Components
import Title from '../Title'

// Stylesheet
import './TopStrip.css'

const TopStrip = () => {
  return (
      <div className='d-none d-sm-flex justify-content-between align-items-center topStrip'>
        <div>
            <Title title="Welcome to Leom Tech" cssClass={"fs-6 fw-normal"}/>
        </div>
        <div className='d-flex justify-content-between gap-4 quickContact'>
            <span> +1 806 524 9547</span>
            <span><i className="fa fa-paper-plane me-1" aria-hidden="true"></i> 
              <a href="mailto:info@leomtech.com">info@leomtech.com</a>
            </span>
            <span>
              <a href="mailto:info@leomtech.com">Logout</a>
            </span>
        </div>
    </div>
  )
}
export default TopStrip