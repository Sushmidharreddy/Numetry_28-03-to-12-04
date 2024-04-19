import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import RegistrationService from '../Service/RegistrationService';
import { Modal } from 'react-bootstrap';

function LoginPage() {

    const[credentials,setCredentials]=useState({
        userName:"",
        password:""
    });

    const onChangeHandler =(e)=>
    {
      if(role==="")
          {
            setPopUp1(true);
          }
        const name=e.target.name;
        const val=e.target.value;
        setCredentials({...credentials,[name]:val});
    }

    const[role,setRole]=useState("");

    const roleHandler=(e)=>
    {
        setRole(e.target.value);
    }


    const submitHandler=(e)=>
    {   e.preventDefault();
       
          loginResponse();
           
    }
    const userName=credentials.userName
    console.log(userName)

    const  loginResponse=async(e)=>
    {    
        const response=await RegistrationService.postDetailsLogin(credentials)
        // const response1 =await RegistrationService.getRole(userName)
        console.log(response.data)
        const loginuser=response.data;
        sessionStorage.setItem("uname",JSON.stringify(credentials))
        // const role=response1.data
  
        const s=response.data;
        if(s)
        {
          const response1 =await RegistrationService.getRole(userName)
          const Role=response1.data
          console.log(Role)
          console.log(role)
          
          if(role==="admin" && Role==="Admin")
              navigate("/dashboard", {state:{s}});
          else if(role==="user" && Role==="user")
          {
            const res= await RegistrationService.getBookDetails();
            const books=res.data
              navigate("/userlogin",{state:{books}});
          }

          else
            setPopup(true)
      }
        else
                setPopup(true);
    }
    let navigate=useNavigate();

    const SigninHandler=()=>
    {
        navigate("/signupPage")
    }
    const[popup,setPopup]=useState();
    const[popup1,setPopUp1]=useState();

    const handlePopupClose=()=>
    {
        setPopup(false);
        setPopUp1(false)
    }

    

  return (
    <>
      <div>
        <div className='container mt-5'>
          <div className='text-center mb-5'>
              <input type='radio' name="role" value="admin" onChange={roleHandler} className='ms-5'/><b>Admin</b> 
              <input type='radio' name="role" value="user" onChange={roleHandler} className='ms-5'/><b>Other</b>
          </div>
        <div className='row border border-3 border-dark '>
         <div className='col-4 border-end border-dark border-3 bg-success'>
        <div className='xyz'>
         <div className='text-center'>
         <h2 className='mb-5 text-light'>Welcome...!</h2>
            <button className='btn btn-light px-5 rounded-pill fw-bold' onClick={SigninHandler}>Sign Up</button>
        </div>
        </div>
         </div>
        <div className='col-8'>
        <form className='form-control text-center my-3' onSubmit={submitHandler}>
            <h3>Please Login...!!!</h3>
         <input type='text' name='userName' value={credentials.userName} onChange={onChangeHandler} placeholder='Username.....' className='my-5 p-2 form-control fw-bold' required/>
         <input type='password' name='password' value={credentials.password} onChange={onChangeHandler} placeholder='Password.....' className='my-5 p-2 form-control fw-bold' required />
         <button className='btn btn-success rounded-pill px-4 fw-bold' >Sign In</button>
         </form>
         </div>
         
         </div>
         </div>
         <div>
         <Modal show={popup}  backdrop="static" keyboard={false}>
            <Modal.Body>
              <h6>Invalid username/password..........</h6>
            </Modal.Body>
            <Modal.Footer>
            <button onClick={handlePopupClose} className='btn btn-info'>close</button>
            </Modal.Footer>
      </Modal>
      </div>
      <div>
         <Modal show={popup1}  backdrop="static" keyboard={false}>
            <Modal.Body>
              <h6>Please Select Role..........</h6>
            </Modal.Body>
            <Modal.Footer>
            <button onClick={handlePopupClose} className='btn btn-info'>close</button>
            </Modal.Footer>
      </Modal>
      </div>
      </div>
    </>
  );
}

export default LoginPage;
