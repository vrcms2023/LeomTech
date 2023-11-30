import React from 'react'
import {Link} from 'react-router-dom'
import Title from '../../Common/Title'

import './EditAdminCommonStyles.css'

const EditAdminPopupHeader = ({closeHandler, title}) => {
    
  return (
    <div className="d-flex align-items-center justify-content-between border mb-5 adminEditTestmonialHeader" >
          <h6 className='p-3 fw-normal text-warning m-0 '>
            <Title title={title} subTitle='Edit-Mode'/>
            {/* <small className='text-dark'></small> */}
            </h6>
          <Link to="#"  className='p-3 text-decoration-none text-black' onClick={closeHandler}>Close <span className="text-danger fw-bold">X</span></Link>
        </div>
  )
}
export default EditAdminPopupHeader