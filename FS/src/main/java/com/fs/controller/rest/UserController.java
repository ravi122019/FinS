package com.fs.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fs.context.FSContext;
import com.fs.controller.base.BaseController;
import com.fs.pojo.User;
import com.fs.services.UserService;
import com.fs.services.base.FSUserLoginDetailsService;
import com.fs.services.base.Service;
import com.fs.to.UserTo;
import com.fs.utils.DataBinderUtil;
import com.fs.utils.JwtUtil;

@RestController
@RequestMapping("/user")
public class UserController extends  BaseController<UserTo, User>{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private FSUserLoginDetailsService loginDetailService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private DataBinderUtil binder;

	/*
	 * @Override protected Example<User> getExample(Map<String, String> map) { User
	 * user =new User(); user.setFirmId(1l); Example<User> domain =
	 * Example.of(user); return domain; }
	 */

	@Override
	protected Service<User> getService() {
		return userService;
	}

	@SuppressWarnings("rawtypes")
	@Override
	protected Class getBusinessObject() {
		return UserTo.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	protected Class getDomainObject() {
		return User.class;
	}
	
	@PostMapping
	@RequestMapping(value = "/authenticate")
	public ResponseEntity<Object> createAuthToken(@RequestBody UserTo userInfo) throws Exception {
		User user = null;
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userInfo.getLoginName(), userInfo.getPassword()));
			user = userService.getUserByUserName(userInfo.getLoginName());
		} catch (BadCredentialsException e) {
			return new ResponseEntity<Object>(new String("UserName or Password is incorrect."), HttpStatus.BAD_REQUEST);
		}
		final UserDetails userDetails = loginDetailService.loadUserByUsername(userInfo.getLoginName());
		UserTo userTo = (UserTo) binder.toBusiness(user, UserTo.class);
		String key=jwtUtil.generateToken(userDetails);
		FSContext.createAuthenticatedSession(user);
		return new ResponseEntity<Object>(new LoginWithKey(key,userTo), HttpStatus.OK);
	}


	class LoginWithKey {
		private String aceess_key;
		private UserTo userTo;
		LoginWithKey(String aceess_key,UserTo userTo){
			this.aceess_key=aceess_key;
			this.userTo=userTo;
		}
		public String getAceess_key() {
			return aceess_key;
		}
		public void setAceess_key(String aceess_key) {
			this.aceess_key = aceess_key;
		}
		public UserTo getUserDto() {
			return userTo;
		}
		public void setUserDto(UserTo userTo) {
			this.userTo = userTo;
		}
	}


}
