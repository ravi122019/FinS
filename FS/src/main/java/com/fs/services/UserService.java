package com.fs.services;

import com.fs.pojo.User;
import com.fs.services.base.Service;

public interface UserService extends Service<User>{

	User getUserByLoginName(String loginName);
	

}
