import { parse } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import RegistrationService from '../Service/RegistrationService';

function AddtoCartBook() {

   const [hh,sethh]=useState([]);
    useEffect(() => {
    
       const book=sessionStorage.getItem("books");
       const books=JSON.parse(book);
        sethh(books)
      
    }, []);
   console.log(hh)


const buyBook=(book)=>
{
 const  uname=sessionStorage.getItem("uname");
 const login=JSON.parse(uname)
 console.log(login)
 const userName=login.userName;
 const email=login.email;
 const bookName=book.bookName;
 const bookAuthor=book.bookAuthor;
 const  price=book.price;
    RegistrationService.postIssued(bookAuthor,bookName,price,email,userName).then(res=>
    {
      alert("book issued");
    })
}

const deleteBook = (index) => {
  const updatedBooks = [...hh];
  updatedBooks.splice(index, 1);
  sethh(updatedBooks);
};
  
    
  return (
  <>
  <div >
  <div className='container'>
        <div className='bg-success px-5 py-2 rounded'>
         <h4 className='text-light'>Your Cart Details as Follows</h4>
         </div>
        

      {hh.map((book, index) => (
        <div className='card mt-5 ms-5 w-50' key={index}>
          <div className='card-body'>
            <div className='row'>
                <div className='col-8'>
            <h5><span className='fw-bold'>BookName:</span> {book.bookName}</h5>
            <h5><span className='fw-bold'>Price:</span> {book.price}</h5>
            <h5><span className='fw-bold'>Author:</span> {book.bookAuthor}</h5>
            {/* <button className='btn btn-success px-5 fw-bold rounded-pill ms-auto' onClick={()=>buyBook(book)}>Buy </button> */}
            </div>
            <div className='col-4'>
            
            <button className='btn btn-success px-5 fw-bold rounded-pill ms-auto' onClick={()=>buyBook(book)}>Buy </button>
            <button className='btn btn-danger px-5 fw-bold rounded-pill ms-2' onClick={() => deleteBook(index)}>Delete</button>

                </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  
  </>
  )
}

export default AddtoCartBook