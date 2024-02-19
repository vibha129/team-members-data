import React from 'react'

import EditIcon from '@mui/icons-material/Edit';

import Avatar from '@mui/material/Avatar'


import  "./Teamdata.css"

function Teamcard(props) {

  //  **************************** props destructuring******************
  const { teminfo,EditHandler ,key} = props


const editHandler=(id)=>{
 
  EditHandler(id)
}



  return (
    <>






      <div key ={key} style={{ margin: "1rem" }}>


        <div className="info_section">

          <div><Avatar sx={{ width: 56, height: 56 }}>{teminfo?.first_name?.[0]}</Avatar></div>
          <div className="info_box">

            <p style={{
              fontSize: "1.2rem",
              color: "black"
            }} >{teminfo?.first_name} {teminfo?.last_name} 
            
            
                    {teminfo?.admin_role === "yes" && <span style={{fontSize:"1rem"}}>(Admin)</span>}





            </p>
            <p style={{
              fontSize: "1rem",
              color: "#938b8b"
            }}>{teminfo?.phone_no}</p>
            <p style={{
              fontSize: "1rem",
              color: "#938b8b"
            }}>{teminfo?.email}</p>


          </div>
          <div><EditIcon  titleAccess="Edit/Delete" sx={{cursor:"pointer"}} onClick={()=>editHandler(teminfo?.id)} /></div>
        </div>



      </div>


    </>
  )
}
export default Teamcard;