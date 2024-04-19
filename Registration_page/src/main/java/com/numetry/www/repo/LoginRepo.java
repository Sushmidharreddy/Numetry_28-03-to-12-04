package com.numetry.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.numetry.www.entity.LoginEntity;

public interface LoginRepo extends JpaRepository<LoginEntity, Long>
{
		LoginEntity findByLoginTime(String userName);
}
