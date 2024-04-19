import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationService from '../Service/RegistrationService';
import {Modal} from 'react-bootstrap'
import BookDetailsWrapper from './BookDetailsWrapper';
import {Button,Typography,Box} from '@mui/material'
import AddtoCartBook from './AddtoCartBook';

function UserLogin() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await RegistrationService.getBookDetails();
                console.log(res.data);
                setBooks(res.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    const [selectedBook, setSelectedBook] = useState(null);
    const[popup,setPopup]=useState();
    const handleViewDetails = (book) => {
      setSelectedBook(book);
      setPopup(true)
    };

    const closeBook=()=>
    {
      setPopup(false)
    }
    
    let navigate=useNavigate()
    const AddtoCart = (book) => {
      let storedBooks = JSON.parse(sessionStorage.getItem('books')) || []; // Initialize storedBooks as an empty array if it's not present in session storage
      const isBookExists = storedBooks.some((storedBook) => storedBook.bookName=== book.bookName); // Check if the book already exists in the storedBooks array
    
      if (!isBookExists) {
        storedBooks.push(book); // Append the new book to the existing array of books only if it doesn't already exist
        sessionStorage.setItem('books', JSON.stringify(storedBooks)); // Store the updated array back to session storage
      }
    
      navigate("/addtocart");
    };
    
    
    

    return (
        <>
            <div className='container m-5'>
                <h3></h3>
                <div className="row">
                    {books.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card ">
                            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <img
            className="card-img-top"
            src={`data:image/jpeg;base64,${book.bookImage}`}
            // onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder.jpg'; }} // Use a placeholder image in case of error
            alt="Book Cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
                                <div className="card-body">
                                    <h5 className="card-title"><b>BookName:</b> {book.bookName}</h5>
                                    <h6 className="card-text text-success">Price: {book.price}</h6>
                                    {/* <Link to={{ pathname: '/book-details', state: { book } }} className="btn btn-primary">View Details</Link> */}
                                                  
                
                                    <button onClick={() => handleViewDetails(book)} className="btn me-5 btn-primary">View Details</button>
                                    <button className='btn btn-success ms-5' onClick={()=> AddtoCart(book)}>Add To Cart</button>

          
                                </div>
                            </div>
                            
                        </div>
                        
                    ))}
                </div>
                <Modal show={popup}>
                  <Modal.Body><BookDetailsWrapper book={selectedBook} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                     <Button variant="contained">
                          <Typography variant="h6" onClick={closeBook}>Close</Typography>
                    </Button>
                    </Box>      
                  </Modal.Body>
                </Modal>
            </div>

       
          
        </>
    );
}

export default UserLogin;
