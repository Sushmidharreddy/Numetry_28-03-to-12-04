import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RegistrationService from '../Service/RegistrationService';
import Button from "@mui/material/Button";
import {Modal} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import {AppBar,Toolbar,Box} from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';


function DashBoard() {
  const { state } = useLocation();
  const d = state.s;
  const r = d[d.length-1];
  const a=r.loginTime;

 
 
  console.log(d)
 
 
  // const r =d;
  // const a=r.loginTime;
  // console.log(a)

  

  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutResponse();
  };
  const [hh,setHh] = useState();

  const logoutResponse=async()=>
  {
    try {
      const response=await RegistrationService.postDetailslogout(a); // Assuming r is defined somewhere
      
      console.log('Response Data:', response.data);

      setHh(response.data);
      console.log(hh)
      const s=response.data.logoutTime;
      d.logoutTime=s;
      const e=response.data.logoutDate
      d.logoutDate=e;
      console.log(d);
    
      if(response.data)
      {
        setHh(response.data); 
        console.log('Output after setting:',hh); // Log output state after setting
        navigate("/");
      }
    
    } catch (error) {
      console.error('Error occurred during logout:', error);
      // Handle error if necessary
    }
  }

//   const[popup,setPopup]=useState();

//   const addBook=()=>
//   {
//     setPopup(true);
//   }

//   const [bookDetails, setBookDetails] = useState({
//     bookName: "",
//     bookAuthor: "",
//     publisherName: "",
//     publishingDate: "",
//     totalCopies: "",
//     issuedCopies: "",
//     availableCopies: "",
//     price:"",
//     description:"",
//     bookImage: null
// });

// const onInputChange = (e) => {
//     const { id, value } = e.target;
//     setBookDetails({ ...bookDetails, [id]: value });
    
// };

// useEffect(() => {
//     // Calculate availableCopies whenever totalCopies or issuedCopies change
//     const total = parseInt(bookDetails.totalCopies);
//     const issued = parseInt(bookDetails.issuedCopies);
    
//     if (!isNaN(total) && !isNaN(issued)) {
//       if(total>issued)
//       {
//         setBookDetails(prevState => ({
//             ...prevState,
//             availableCopies: (total - issued).toString()
//         }));
//       }
//       else
//       {
//         alert("invalid")
//         setBookDetails({...bookDetails,issuedCopies:"",availableCopies:""})
//       }
//       }
//     }, [bookDetails.totalCopies, bookDetails.issuedCopies]);


// const onFileChange = (e) => {
//     setBookDetails({ ...bookDetails, bookImage: e.target.files[0] });
// };

// const onSubmit = (e) => {
//  e.preventDefault();

//     const formData = new FormData();
//     Object.entries(bookDetails).forEach(([key, value]) => formData.append(key, value));

//     const res=RegistrationService.postBookDetails(formData)
//         .then(() => alert("Book added successfully"))
//         .catch((error) => {
//             console.error('Error submitting form:', error);
//             alert('Failed to add book.');
//         });
//         if(res.data="Form submitted successfully!")
//         {
//           setPopup(false);
//           window.location.reload();
//         }

      
// };

const libraryHandler=async()=>
{
  const res = await RegistrationService.getBookDetails();
  const bookDetails=res.data;
  console.log(bookDetails)
  navigate('/adminBook',{state:{bookDetails}});
}


  return (
    <div className='container mt-5'>
      <div className='text-center bg-primary p-2 rounded  '>
      <h4 className='d-inline-block me-5 text-light'>Welcome to Numetry Technologies Dashboard</h4>
      <button className='ms-5 btn btn-warning px-4 rounded-pill fw-bold' onClick={logoutHandler}>Logout</button>
      <button className='btn btn-info px-2 fw-bold ms-5' onClick={libraryHandler}>Track Library Status</button>
      </div>
      {/* <Button variant="contained" className='ms-5 fw-bold' onClick={addBook}>ADD BOOK</Button> */}
      <table className='table table-striped table-bordered my-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>LoginTime</th>
            <th>LoginDate</th>
            <th>LogoutTime</th>
            <th>LogoutDate</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over output and render table rows */}
          {d.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.userName}</td>
              <td>{employee.email}</td>
              <td>{employee.loginTime}</td>
              <td>{employee.loginDate}</td>
              <td>{employee.logoutTime}</td>
              <td>{employee.logoutDate}</td>
            </tr>
          ))}
          

        </tbody>
      </table>

      {/* <Modal show={popup}>
      <div> 
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Fill Details to add book
                    </Typography>
                </Toolbar>
            </AppBar>

            <form onSubmit={onSubmit} sx={{m:3}} >
            <Box
             sx={{
            '& > :not(style)': { m: 1,mt:4, width: '25ch' },
             }}
            >
                <TextField required id="bookName" label="Book Name" variant="outlined" value={bookDetails.bookName} onChange={onInputChange} />
                <TextField required id="bookAuthor" label="Book Author" variant="outlined" value={bookDetails.bookAuthor} onChange={onInputChange} />
                </Box>
                <Box
             sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
             }}
            >
                <TextField required id="publisherName" label="Publisher Name" variant="outlined" value={bookDetails.publisherName} onChange={onInputChange} />
                <TextField required id="publishingDate" label="Publishing Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} value={bookDetails.publishingDate} onChange={onInputChange} />
                </Box>
                <Box
             sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
             }}
            >
                <TextField required id="totalCopies" label="Total Copies" variant="outlined" value={bookDetails.totalCopies} onChange={onInputChange} />
                <TextField required id="issuedCopies" label="Issued Copies" variant="outlined" value={bookDetails.issuedCopies} onChange={onInputChange} />
                </Box>
                <Box
             sx={{
            '& > :not(style)': { m: 1,mb:3, width: '25ch' },
             }}
            >
                <TextField required id="availableCopies" label="Available Copies" variant="outlined" value={bookDetails.availableCopies} onChange={onInputChange} />
                <TextField required id="price" label="Book Price" variant="outlined" value={bookDetails.price} onChange={onInputChange} />
               </Box>
                <Box
             sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
             }}
            >
               <TextField required id="description" label="description" variant="outlined" value={bookDetails.description} onChange={onInputChange} />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Book Image
                    <input id="bookImage" type="file" onChange={onFileChange} style={{ display: "none" }} required />
                </Button>
               
                </Box>
              
                <Box sx={{ display: 'flex', mb:4, justifyContent: 'center' }}>
                    <Button type="submit" variant="contained">Upload</Button>
                </Box>
            </form>
        </div>
         
      </Modal> */}
      {/* <AdminPage/> */}
    </div>
  );
}

export default DashBoard;
