package com.fs.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fs.controller.base.BaseController;
import com.fs.dto.UserDto;
import com.fs.pojo.User;
import com.fs.services.UserService;
import com.fs.services.base.Service;

@RestController
@RequestMapping("/user")
public class UserController extends  BaseController<UserDto, User>{
	
	@Autowired
	private UserService service;

	@Override
	protected Example<User> getExample(Map<String, String> map) {
		User user =new User();
		user.setFirmId(1l);
		Example<User> domain = Example.of(user);
		return domain;
	}

	@Override
	protected Service<User> getService() {
		return service;
	}

	@Override
	protected Class getBusinessObject() {
		return UserDto.class;
	}

	@Override
	protected Class getDomainObject() {
		return User.class;
	}

}
