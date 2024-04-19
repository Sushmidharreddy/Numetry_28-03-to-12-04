package com.numetry.www.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.numetry.www.entity.BookEntity;
import com.numetry.www.entity.BookIssued;
import com.numetry.www.entity.LoginEntity;
import com.numetry.www.entity.RegistrationEntity;
import com.numetry.www.repo.BookIssuedRepo;
import com.numetry.www.repo.BookRepo;
import com.numetry.www.repo.LoginRepo;
import com.numetry.www.repo.RegistrationRepository;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class RegistrationController
{
	@Autowired
	RegistrationRepository repo;
	
	
	@GetMapping("/get")
	public List<RegistrationEntity> getDetails()
	{
		return repo.findAll();
	}
	
	@PostMapping("/post")
	public RegistrationEntity postDetails(@RequestBody RegistrationEntity reg)
	{
		 
		if(reg.getEmail().endsWith("numetry.in"))
			reg.setRole("Admin");
		else
			reg.setRole("user");
		return repo.save(reg);
		
	}
	
	@PostMapping("/role/{userName}")
	public String getRole(@PathVariable String userName)
	{
		RegistrationEntity user= repo.findByUserName(userName);
		return user.getRole();
	}

	
	@Autowired
	LoginRepo loginRepo;
	
	@PostMapping("/login")
	public List<LoginEntity> getLogin(@RequestBody LoginEntity login)
	{
		RegistrationEntity  user = repo.findByUserName(login.getUserName());
		if(user!=null && user.getPassword().equals(login.getPassword()))
		{
			
			String date=LocalDate.now().toString();
			LocalTime time=LocalTime.now();
			DateTimeFormatter formatedDate=DateTimeFormatter.ofPattern("HH:mm:ss");
			String timeFinal = time.format(formatedDate);
			login.setLoginDate(date);
			login.setLoginTime(timeFinal);
			login.setEmail(user.getEmail());
			loginRepo.save(login);
			return loginRepo.findAll();			
		}
		else
		{
			return null;
		}

	}
	
	
	@PostMapping("/logout/{loginTime}")
	public LoginEntity logoutDetails(@PathVariable String loginTime) {
	    // Find the user's login record based on the username
	    LoginEntity login = loginRepo.findByLoginTime(loginTime);

	    if (login != null) {
	        // Set the logout date and time
	        String date = LocalDate.now().toString();
	        String timeFinal = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
	        login.setLogoutDate(date);
	        login.setLogoutTime(timeFinal);

	        // Save the updated login entity back to the database
	        return loginRepo.save(login);
	         

	        
	    } else {
	        // Return a failure message if the user's login record is not found
	        return null;
	    }
	}
	
	@GetMapping("/get1")
	public List<LoginEntity> get()
	{
		return loginRepo.findAll();
	}
	
	@PostMapping("/logins")
	public LoginEntity getLogins(@RequestBody LoginEntity login)
	{
		RegistrationEntity  user = repo.findByUserName(login.getUserName());
		if(user!=null && user.getPassword().equals(login.getPassword()))
		{
			
			String date=LocalDate.now().toString();
			LocalTime time=LocalTime.now();
			DateTimeFormatter formatedDate=DateTimeFormatter.ofPattern("HH:mm:ss");
			String timeFinal = time.format(formatedDate);
			login.setLoginDate(date);
			login.setLoginTime(timeFinal);
			return  loginRepo.save(login);
				
		}
		else
		{
			return null;
		}

	}
	
	@Autowired
	BookRepo bookRepo;
	
	@GetMapping("/getBook")
	public List<BookEntity> getBookDetails()
	{
		return bookRepo.findAll();
	}
	
	
	

	@PostMapping("/postBook")
	public ResponseEntity<String> submitFormData(@RequestParam("bookName") String bookName,
	                                             @RequestParam("bookAuthor") String bookAuthor,
	                                             @RequestParam("publisherName") String publisherName,
	                                             @RequestParam("publishingDate")  @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate publishingDate,
	                                             @RequestParam("totalCopies") String totalCopies,
	                                             @RequestParam("issuedCopies") String issuedCopies,
	                                             @RequestParam("availableCopies") String availableCopies,
	                                             @RequestParam("price") String price,
	                                             @RequestParam("description") String description,
	                                             @RequestParam("bookImage") MultipartFile bookImage) {
	    try {
	        // Create a new instance of the Book entity
	        BookEntity book = new BookEntity();
	        book.setBookName(bookName);
	        book.setBookAuthor(bookAuthor);
	        book.setPublisherName(publisherName);
//	        DateTimeFormatter formatedDate=DateTimeFormatter.ofPattern("yyyymmdd");
//	    	Date x publishingDate = .format(formatedDate);
	        book.setPublishingDate(publishingDate);
	        book.setTotalCopies(totalCopies);
	        book.setIssuedCopies(issuedCopies);
	        book.setAvailableCopies(availableCopies);
	        book.setPrice(price);
	        book.setDescription(description);
	        book.setBookImage(bookImage.getBytes()); // Convert MultipartFile to byte array and set

	        // Save the book entity using the repository
	        bookRepo.save(book);

	        return ResponseEntity.ok("Form submitted successfully!");
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit form.");
	    }   
	}
	
	@PutMapping("/book/update/{bookid}")
	public ResponseEntity<BookEntity> updateBookDetails(@PathVariable long bookid,@RequestParam("bookName") String bookName,
            @RequestParam("bookAuthor") String bookAuthor,
            @RequestParam("publisherName") String publisherName,
            @RequestParam("publishingDate")  @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate publishingDate,
            @RequestParam("totalCopies") String totalCopies,
            @RequestParam("issuedCopies") String issuedCopies,
            @RequestParam("availableCopies") String availableCopies,
            @RequestParam("price") String price,
            @RequestParam("description") String description,
            @RequestParam("bookImage") MultipartFile bookImage) throws IOException
	{
		BookEntity book=bookRepo.findByBookid(bookid);
		book.setBookName(bookName);
		book.setBookAuthor(bookAuthor);
		book.setDescription(description);
		book.setIssuedCopies(issuedCopies);
		book.setAvailableCopies(availableCopies);
		book.setPrice(price);
		book.setPublishingDate(publishingDate);
		book.setTotalCopies(totalCopies);
		book.setPublisherName(publisherName);
		book.setBookImage(bookImage.getBytes());

		
		BookEntity updateBook = bookRepo.save(book);
		return ResponseEntity.ok(updateBook);
	}
	
	@DeleteMapping("/book/delete/{bookid}")
	public ResponseEntity<BookEntity> deleteBook(@PathVariable long bookid)
	{
			BookEntity book=bookRepo.findByBookid(bookid);
			bookRepo.delete(book);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/getbook/{bookid}")
	public BookEntity getDetailsById(@PathVariable long bookid)
	{
		return bookRepo.findByBookid(bookid);
	}
	
	@Autowired
	BookIssuedRepo bookIssuedRepo;
	
	
	@PostMapping("/issuedDetails")
	public String IssedDetails(@RequestBody BookIssued request) {
	    // Extracting parameters from the request object
	    String bookAuthor = request.getBookAuthor();
	    String bookName = request.getBookName();
	    String price = request.getPrice();
	    String email = request.getEmail();
	    String userName = request.getUserName();
	    
	    RegistrationEntity rr =repo.findByUserName(userName);
	    // Call the postIssued method with extracted parameters
//	    postIssued(bookAuthor, bookName, price, email, userName);
	    
	    request.setBookAuthor(bookAuthor);
	    request.setBookName(bookName);
	    request.setEmail(rr.getEmail());
	    request.setPrice(price);
	    request.setUserName(userName);
	    bookIssuedRepo.save(request);
	    
	    

	    return "done";
	}
	
	@GetMapping("/get/IssuedDetails")
	public List<BookIssued> getDetailsofIssed()
	{
		return bookIssuedRepo.findAll();
	}
	

	
	
	
	
	

	
	
	
	
	
}
