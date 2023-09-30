import React,{useEffect,useState} from 'react';
import axios from "../../../Config/axios"
import ResponsiveAppBar from "../../header/navbar";
import {useSocket} from "../../../context/socketProvider"
import  {useSelector}  from 'react-redux';
import Swal from "sweetalert2"
import "./mentorHome.scss";
import { useNavigate } from 'react-router-dom';

function MentorHome() {
const [totalLearners,setTotalLearners] = useState(0)
const socket = useSocket()
const mentorDetailsForChat = useSelector(
  (state) => state.loggedUser.currentUser
);
const navigate = useNavigate()

useEffect(()=>{
  fetchTotalLearners()
  socket.emit('setup',mentorDetailsForChat)
},[])

useEffect(()=>{
socket.on('user-requested',(user,roomId)=>{
  Swal.fire({
    title: 'Chat Request',
    text: `${user.name} Requested a chat , Do you want to join ?`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  }).then((result)=>{
    if(result.isConfirmed){
      socket.emit('join-chat',roomId)
      const roomJoin = ()=>{
        navigate(`/mentor/chat/${user._id}`)
      }
      socket.on('chat-connected',roomJoin)
    }
  })
})
},[])

const fetchTotalLearners = async () => {
  const response = await axios.get('/mentor/getLearners');
  const { totalLearners } = response.data;
  setTotalLearners(totalLearners);
};

  return (
  <div>
     <ResponsiveAppBar role={'mentor'} />
     <br />
      <div className="mentor-homepage">
      <div className="mentor-homepage__box">
        <h3>Total Learners</h3>
        <p>{totalLearners}</p>
      </div>
      <div className="mentor-homepage__box">
        <h3>Your Courses</h3>
        <p>10</p>
      </div>
      <div className="mentor-homepage__box">
        <h3>Total Earnings</h3>
        <p>10</p>
      </div>
    </div>
  </div>
  );
}

export default MentorHome;


