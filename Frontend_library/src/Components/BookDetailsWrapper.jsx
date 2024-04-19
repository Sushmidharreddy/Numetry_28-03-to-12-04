import React from 'react';

const BookDetailsWrapper = ({ book }) => {
  return (
    <div className="container">
      <h3>Book Details</h3>
      <div className="card w-100 h-100">
        <div className="card-body ">
          <h5 className="card-title"><b>Book Name:</b> {book.bookName}</h5>
          <h6 className="card-text"><b>Author:</b> {book.bookAuthor}</h6>
          <h6 className="card-text"><b>PublisherName: </b>{book.publisherName}</h6>
          <h6 className="card-text"><b>Published Date: </b>{book.publishingDate}</h6>
          <h6><b>Availabe Copys:</b> {book.availableCopies}</h6>
          <h6><b>Description:</b> {book.description}</h6>
                    {/* Add more book details as needed */}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsWrapper;
