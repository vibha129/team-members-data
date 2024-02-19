import React, {  useState } from 'react'
import  "./Teamdata.css"
import AddIcon from '@mui/icons-material/Add';

import { useBaseModal } from "../Teaminfo/useBasemodal";
import ADDEditDetailsModal from "../TeamInfoEdit/ADDEditDetailsModal"
import { useSelector } from 'react-redux';

import Teamcard from "../Teaminfo/Teamcard"

function Teamdata() {

  // *********************************** Custom hook for modal open or close*********************************************
  const editmodal = useBaseModal()
  const addmodal=useBaseModal()

  const [ids, setIds] = useState()
const [Getdata,setGetData]=useState([])

  //******************************************* */ store to get a data ******************************

  // /*********************************************useSelector use for fetch value for store********************************************8 */
  const items = useSelector(state => state.deatils);

  // ************************************************* Plus button Handler ***************************************************
  const AddHandler=()=>{
       // **********************************open add modal ***************************
    addmodal.open()
    // ***************************** Generate random id for users**********************************************************
    const randomNumber = Math.round(Math.random() * 1000000000);
    setIds(randomNumber)
  }
  // *********************************************edit handler******************************************************************
  const EditHandler = (id) => {
    // **********************************open Edit modal***************************
    editmodal.open()
    // ********************************************selected member information******************************************************
    let selectedData=items?.filter((item,index)=>{return item.id===id })
    setGetData(selectedData[0])
  }







  
  return (
    <div className="team_info_parents">
{/* Add modal */}
      {addmodal.isOpen &&
        <ADDEditDetailsModal
          open={addmodal.isOpen}
          handleClose={addmodal.close}
          ids={ids}
          iteminfo={[]}
          dataList={items}
          type="Add"
          
        />
      }
      {/* Edit modal */}
        {editmodal.isOpen &&
        <ADDEditDetailsModal
          open={editmodal.isOpen}
          handleClose={editmodal.close}
          ids={"edit"}
          iteminfo={Getdata}
          dataList={items}
          type="Edit"
          
        />
      }
      <div className="team_info_container">
        <div className="team_info_child"  >
          <div>
            <div className="addicon">


              <AddIcon titleAccess='add members' sx={{ cursor: "pointer", fontSize: "2rem" }} onClick={() => AddHandler()} />
            </div>

            <div className="team_title" >
              <p className="memebersTitle">Team Members</p>
              <p style={{ fontSize: "1.2rem", color: "#938b8b" }}>You have {items?.length} team members</p>
            </div>

          </div>
          <div className="info_container">

            <div style={{ margin: "1rem" }}>
              {items && items?.map((item, index) => {
                return (<>
                 <Teamcard  key ={index+1} teminfo={item} EditHandler={EditHandler}/>
                </>)
              })}


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Teamdata;