import React, { useEffect, useState} from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import {Modal} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "@mui/material/Typography";
import {AppBar,Toolbar,Box} from '@mui/material';
import Button from "@mui/material/Button";
import RegistrationService from '../Service/RegistrationService';
import AdminPage from './AdminPage';
import UpdateBook from './UpdateBook';

function AdminBook() {
    const{state} = useLocation();
    const bookDetails1=state.bookDetails;
    console.log(bookDetails1)

    
  const[popup,setPopup]=useState();
    const addBook=()=>
  {
    setPopup(true);
  }

  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    bookAuthor: "",
    publisherName: "",
    publishingDate: "",
    totalCopies: "",
    issuedCopies: "",
    availableCopies: "",
    price:"",
    description:"",
    bookImage: null
});

const onInputChange = (e) => {
    const { id, value } = e.target;
    setBookDetails({ ...bookDetails, [id]: value });
    
};

useEffect(() => {
    // Calculate availableCopies whenever totalCopies or issuedCopies change
    const total = parseInt(bookDetails.totalCopies);
    const issued = parseInt(bookDetails.issuedCopies);
    
    if (!isNaN(total) && !isNaN(issued)) {
      if(total>issued)
      {
        setBookDetails(prevState => ({
            ...prevState,
            availableCopies: (total - issued).toString()
        }));
      }
      else
      {
        alert("invalid")
        setBookDetails({...bookDetails,issuedCopies:"",availableCopies:""})
      }
      }
    }, [bookDetails.totalCopies, bookDetails.issuedCopies]);


const onFileChange = (e) => {
    setBookDetails({ ...bookDetails, bookImage: e.target.files[0] });
};

const onSubmit = (e) => {
 e.preventDefault();

    const formData = new FormData();
    Object.entries(bookDetails).forEach(([key, value]) => formData.append(key, value));

    const res=RegistrationService.postBookDetails(formData)
        .then(() => alert("Book added successfully"))
        .catch((error) => {
            console.error('Error submitting form:', error);
            alert('Failed to add book.');
        });
        if(res.data="Form submitted successfully!")
        {
          setPopup(false);
          window.location.reload();
        }

      
};





const popupClose=()=>
{
    setPopup(false);
    window.location.reload();
}
// let navigate=useNavigate();
// const backhandler=()=>
// {
//     navigate("/dashboard")
// }

const[updatePopup,setUpdatePopup]=useState();

let navigate=useNavigate();
const [updBook,setUptBook]=useState();
const handleViewDetails=(book)=>
{
  setUptBook(book);
  setUpdatePopup(true);
}

const [s,setS]=useState([]);
const d=s;
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await RegistrationService.getBookDetails();
      console.log("Response data:", res.data);
      setS(res.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  fetchData();
}, []);



const deletehandler=(book)=>
{
  const b=book.bookid;
  console.log(b)
  RegistrationService.deleteBookDetails(b).then(res=>
  {
    window.location.reload();
  })
  
  
  
}

const [issued,setisued]=useState([]);
useEffect(()=>
{
  const abc=async()=>
  {
    try{
      const res= await RegistrationService.findIssued();
      console.log(res.data)
      setisued(res.data)
    }
    catch(error)
    {
      console.log(error);
    }
 
  }
  abc();
},[])


  return (
    <>
    <div className='container my-5'>
    <div className=' bg-success rounded p-2 fw-bold text-light d-flex justify-content-between align-items-center'>
    {/* <button className='btn btn-primary fw-bold ms-5 px-4 ' onClick={backhandler}>Back</button> */}
    <h4 className='text-center ms-5'>Library details as follows....</h4>
    <button className='btn btn-primary fw-bold me-5' onClick={addBook}>AddBook</button>
    </div>
    <h3 className='bg-info px-5 py-2 mt-5 rounded'>Total Book Details.... </h3>
        <table className='table table-bordered table-striped my-5  '>
        <thead >
            <tr>
            <th >BookId</th>
            <th>BookName</th>
            <th>Author</th>
            <th>PublisherName</th>
            <th>publishedDate</th>
            <th>TotalCopies</th>
            <th>IssuedCopies</th>
            <th>AvailableCopies</th>
            <th>Price</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {s.map((book)=>
        (
                <tr key={book.bookid}>
                    <td>{book.bookid}</td>
                    <td>{book.bookName}</td>
                    <td>{book.bookAuthor}</td>
                    <td>{book.publisherName}</td>
                    {book.publishingDate && (<td>{book.publishingDate.split("T")[0]}</td>)}
                    <td>{book.totalCopies}</td>
                    <td>{book.issuedCopies}</td>
                    <td>{book.availableCopies}</td>
                    <td>{book.price}</td>
                    <td><button className="btn btn-warning  fw-bold " onClick={() => handleViewDetails(book)}>Update</button> <button className="btn btn-danger  fw-bold" onClick={() =>deletehandler(book)}>Delete</button></td>
                  
                </tr>
        ))}
        </tbody>
        </table>

        <Modal show={popup}>
      {/* <div> 
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
              
                <Box sx={{ display: 'flex', mb:4, justifyContent: 'space-around' }}>
                    <Button type="submit" variant="contained" color='success'>Upload</Button>
                    <Button  variant="contained" color='warning'  onClick={popupClose}>Cancel</Button>
                </Box>
            </form>
        </div> */}
         <AdminPage/>
      </Modal>
      <Modal show={updatePopup} >
        <UpdateBook book={updBook}/>
        
      </Modal>
      
      <div>
      <h3 className='bg-info px-5 py-2 mt-5 rounded'>Issued Book Details.... </h3>
      <table className='table table-bordered table-striped my-5  '>
        <thead >
            <tr>
              <th>ID</th>
            <th >UserName</th>
            <th>Email</th>
            <th>BookName</th>
            <th>AuthorName</th>
            <th>Price</th>
            
            </tr>
        </thead>
        <tbody>
        {issued.map((book)=>
        (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.userName}</td>
                    <td>{book.email}</td>
                    <td>{book.bookName}</td>
                    <td>{book.bookAuthor}</td>
                    <td>{book.price}</td>
                </tr>
        ))}
        </tbody>
        </table>
      </div>
    </div>

    </>
  )
}

export default AdminBook