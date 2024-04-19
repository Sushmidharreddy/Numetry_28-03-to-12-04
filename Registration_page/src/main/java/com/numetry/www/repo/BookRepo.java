package com.numetry.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.numetry.www.entity.BookEntity;

@Repository
public interface BookRepo extends JpaRepository<BookEntity, Long>
{

	

	BookEntity findByBookid(long bookid);

}
