import React, { useEffect, useState } from 'react';
import RegistrationService from '../Service/RegistrationService';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import {AppBar,Toolbar,Box} from '@mui/material';


function AdminPage() {
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

       const res= RegistrationService.postBookDetails(formData)
            .then(() => alert("Book added successfully"))
            .catch((error) => {
                console.error('Error submitting form:', error);
                alert('Failed to add book.');
            });
            if(res.data="Form submitted successfully!")
            {
                // alert("Book added successfully")'
              setPopup(false);
              window.location.reload();
            }
    };
    const[popup,setPopup]=useState();
    const popupClose=()=>
    {
        setPopup(false);
        window.location.reload();
    }
    
    return (
            
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
              
                <Box sx={{ display: 'flex', mb:4, justifyContent: 'space-around' }}>
                    <Button type="submit" variant="contained" color='success'>Upload</Button>
                    <Button  variant="contained" color='warning'  onClick={popupClose}>Cancel</Button>
                </Box>
            </form>
        </div>
    );
}

export default AdminPage;
