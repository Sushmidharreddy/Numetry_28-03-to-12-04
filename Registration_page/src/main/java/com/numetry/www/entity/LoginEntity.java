package com.numetry.www.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class LoginEntity
{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String userName;
	private String password;
	private String loginDate;
	private String loginTime;
	private String logoutDate;
	private String logoutTime;
	private String email;
	

}
