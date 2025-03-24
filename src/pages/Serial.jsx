import React from 'react'
import '../componenets/Media.css'
import Laptopscrenncomponenet from "../componenets/Laptopscrenncomponenet"; // Corrected name
import MaintenanceMessage from './MaintenanceMessage';
function Serial() {
  return (
    <div>
      <Laptopscrenncomponenet/>
      <MaintenanceMessage />
    </div>
  )
}

export default Serial