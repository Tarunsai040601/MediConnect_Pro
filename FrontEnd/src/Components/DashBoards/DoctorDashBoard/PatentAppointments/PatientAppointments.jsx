import React, { useEffect, useState } from "react";
import "./PatientAppointments.css";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FaUser,
  FaNotesMedical,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHospital,
} from "react-icons/fa";


const API = "https://mediconnect-pro-fg3t.onrender.com/api";


const PatientAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAppointments();
  }, []);



  const getToken = () => {
    return localStorage.getItem("doctorToken");
  };



  const fetchAppointments = async () => {

    try {

      const token = getToken();

      if (!token) {
        console.log("Doctor token not found");
        return;
      }


      const res = await axios.get(
        `${API}/booking/doctorAppointments`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      console.log("Appointments :", res.data);


      setAppointments(
        res.data.details || []
      );


    } catch(error){

      console.log(
        "Fetch Appointment Error:",
        error.response?.data || error.message
      );

    }
    finally{
      setLoading(false);
    }

  };





  const handleAccept = async(id)=>{

    try{

      const token=getToken();


      await axios.patch(
        `${API}/booking/accept/${id}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      Swal.fire(
        "Success",
        "Appointment Accepted",
        "success"
      );


      fetchAppointments();


    }
    catch(error){

      Swal.fire(
        "Error",
        error.response?.data?.message ||
        "Something went wrong",
        "error"
      );

    }

  };






  const handleReject = async(id)=>{


    const {value:reason}=await Swal.fire({

      title:"Reject Appointment",

      input:"text",

      inputLabel:"Reason",

      inputPlaceholder:
      "Enter reject reason...",

      showCancelButton:true,

    });



    if(!reason) return;



    try{


      const token=getToken();



      await axios.patch(

        `${API}/booking/reject/${id}`,

        {
          reason:reason
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );



      Swal.fire(
        "Rejected",
        "Appointment Rejected",
        "success"
      );



      fetchAppointments();



    }
    catch(error){


      Swal.fire(

        "Error",

        error.response?.data?.message ||
        "Something went wrong",

        "error"

      );

    }


  };





  if(loading){

    return(
      <div className="loading">
        <h2>
          Loading Appointments...
        </h2>
      </div>
    );

  }




  return (

    <div className="doctorAppointments">


      <h1>
        Patient Appointments
      </h1>



      <div className="appointmentGrid">


        {
          appointments.length===0 ? (

            <h2>
              No Appointments Found
            </h2>

          ):(

            appointments.map((item)=>(


              <div
                className="appointmentCard"
                key={item.BookingId}
              >


                <div className="cardTop">


                  <h2>

                    <FaUser/>

                    {item.PatientName}

                  </h2>



                  <span
                    className={
                      `status ${
                      item.BookingStatus?.toLowerCase()
                      }`
                    }
                  >

                    {item.BookingStatus}

                  </span>


                </div>





                <p>
                  <FaNotesMedical/>

                  <strong>
                    Disease :
                  </strong>

                  {item.Disease}

                </p>





                <p>

                  <FaHospital/>

                  <strong>
                    Symptoms :
                  </strong>

                  {item.Symptoms || "N/A"}

                </p>





                <p>

                  <FaCalendarAlt/>

                  <strong>
                    Date :
                  </strong>

                  {item.AppointmentDate}

                </p>





                <p>

                  <FaClock/>

                  <strong>
                    Time :
                  </strong>

                  {item.AppointmentTime}

                </p>





                {
                  item.BookingStatus==="Pending" && (

                    <div className="buttonGroup">


                      <button
                        className="acceptBtn"
                        onClick={()=>
                          handleAccept(
                            item.BookingId
                          )
                        }
                      >

                        <FaCheckCircle/>

                        Accept

                      </button>





                      <button
                        className="rejectBtn"
                        onClick={()=>
                          handleReject(
                            item.BookingId
                          )
                        }
                      >

                        <FaTimesCircle/>

                        Reject

                      </button>



                    </div>

                  )
                }



              </div>


            ))

          )
        }


      </div>


    </div>

  );

};


export default PatientAppointments;