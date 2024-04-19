import React, { useState } from 'react';
import RegistrationService from '../Service/RegistrationService';
import { useNavigate } from 'react-router-dom';
import {Modal} from 'react-bootstrap';

function RegistrationPage() {

    const [values, setValues]=useState(
        {
            name:"",
            userName:"",
            password:"",
            email:""
        });
    
    const onChnageHandler=(e)=>
    {
        const name=e.target.name;
        const val=e.target.value;
        setValues({...values,[name]:val});
    }
    let navigate=useNavigate()

    const[popup,setPopup]=useState();

    const submitHandler=(e)=>
    {
        e.preventDefault();
        RegistrationService.postDetails(values).then(res=>
          {
            setPopup(true);
          })
    }

    const loginHandler=()=>
    {
      navigate('/')
    }

    const handlePopupClose=(e)=>
    {
      setPopup(false)
    }

  return (
    <>
    
      <div className='container mt-5  '>
        
        <div className='row border border-dark border-3  '>
        <div className='col-8 text-center  my-4 '>
        <form className='form-control' onSubmit={submitHandler} >
            <h3 >Registration Form</h3>
            <input type="text" name='name' value={values.name} onChange={onChnageHandler} className='form-control my-5 fw-bold' placeholder='Name....' required/>
            <input type="text" name='userName' value={values.userName} onChange={onChnageHandler} className='form-control my-5 fw-bold' placeholder='UserName....' required/>
            <input type='email' name='email' value={values.email} onChange={onChnageHandler} className='form-control my-5 fw-bold' placeholder='Email.....' required/>
            <input type="password" name='password' value={values.password} onChange={onChnageHandler} className='form-control my-5 fw-bold' placeholder='Password....' required/>
            <button className='btn btn-success rounded-pill px-4 fw-bold'>Sign Up</button>
        </form>
        </div>
        <div className='col-4 bg-success  border-dark border-start border-3  '>
        
            <div className='xyz'>
              <div className='text-center'>
             <h2 className='mb-5 fw-bold text-light'>Welcome Back</h2>
              <button className='btn btn-light px-5 rounded-pill fw-bold' onClick={loginHandler}>Sign In</button></div>
              </div>
        </div>
        </div>
      </div>
    <div>
      <Modal show={popup}  backdrop="static" keyboard={false}>
            <Modal.Body>
              <h4>Register Successfully.....!!!</h4>
            </Modal.Body>
            <Modal.Footer>
            <button onClick={handlePopupClose} className='btn btn-info'>close</button>
            </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default RegistrationPage;
