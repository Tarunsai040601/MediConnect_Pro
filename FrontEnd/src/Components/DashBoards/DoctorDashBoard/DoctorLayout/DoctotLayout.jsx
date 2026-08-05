import React from 'react'
import { Outlet } from 'react-router-dom'
import DoctorNavbar from '../DoctorNavbar/DoctorNavbar'

const DoctotLayout = () => {
  return (
    <div>
      <Outlet/>
      <DoctorNavbar/>
    </div>
  )
}

export default DoctotLayout
