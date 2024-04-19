package com.numetry.www.entity;


import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class BookEntity 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long bookid;
	
	private String bookName;
	private String bookAuthor;
	private String publisherName;
	private LocalDate publishingDate;
	private String totalCopies;
	private String issuedCopies;
	private String availableCopies;
	private String price;
	private String description;
	
//	@Lob
	private byte[] bookImage; 
	
	
}
