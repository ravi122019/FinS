package com.fs.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.fs.pojo.User;
import com.fs.repos.UserRepo;
import com.fs.services.UserService;
import com.fs.services.base.impl.ServiceImpl;

@Service
public class UserServiceImpl extends ServiceImpl<User> implements UserService{

	@Autowired
	protected UserRepo userRepo;
	
	@Override
	protected JpaRepository<User, Long> getRepo() {
		return userRepo;
	}

}
