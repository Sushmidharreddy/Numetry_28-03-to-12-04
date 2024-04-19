package com.numetry.www.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.numetry.www.entity.RegistrationEntity;

public interface RegistrationRepository extends JpaRepository<RegistrationEntity, Long> 
{
	RegistrationEntity findByUserName(String userName);

}
