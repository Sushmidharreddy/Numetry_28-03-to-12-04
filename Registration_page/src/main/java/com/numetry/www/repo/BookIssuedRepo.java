package com.numetry.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.numetry.www.entity.BookIssued;

@Repository
public interface BookIssuedRepo extends JpaRepository<BookIssued, Long> 
{

}
