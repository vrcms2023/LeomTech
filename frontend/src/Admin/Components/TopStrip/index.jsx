import React from 'react'
import { Link } from 'react-router-dom'

const TopStrip = () => {
  return (
    <div className='d-flex justify-content-between align-items-center text-white fw-normal p-1 px-3 fixed-top' style={{zIndex: "9999", backgroundColor: "rgba(0, 0, 0)"}}>
        <div>
            <small>VRCMS Admin</small></div>
        <div className='d-flex justify-content-between align-items-center gap-4'>
            <small>Vara Prasad Suravarapu</small>
            <small><Link to="#" className='text-white'>Logout</Link></small>
            {/* <i class="fa fa-cog" aria-hidden="true"></i> */}
        </div>
    </div>
  )
}

export default TopStrip