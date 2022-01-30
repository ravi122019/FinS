package com.fs.controller.rest;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fs.context.FSContext;
import com.fs.pojo.User;
import com.fs.services.UserService;
import com.fs.services.base.FSUserLoginDetailsService;
import com.fs.to.AuthonticatedUserTo;
import com.fs.to.UserTo;
import com.fs.utils.DataBinderUtil;
import com.fs.utils.JwtUtil;

@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FSUserLoginDetailsService loginDetailService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private DataBinderUtil binder;

	
	@PostMapping
	@RequestMapping(value = "/authenticate")
	public ResponseEntity<Object> createAuthToken(@RequestBody UserTo userInfo) throws Exception {
		User user = null;
		try {
			user = userService.getUserByLoginNameAndPassword(userInfo.getLoginName(), userInfo.getPassword());
		} catch (BadCredentialsException e) {
			return new ResponseEntity<Object>(new String("UnAuthorized User."), HttpStatus.UNAUTHORIZED);
		}
		if(user==null) {
			return new ResponseEntity<Object>(new String("UnAuthorized User."), HttpStatus.UNAUTHORIZED);
		}
		final UserDetails userDetails = loginDetailService.loadUserByUsername(userInfo.getLoginName());
		user.setLastLogin(new Date());
		userService.save(user);
		AuthonticatedUserTo userTo = (AuthonticatedUserTo) binder.toBusiness(user, AuthonticatedUserTo.class);
		String key=jwtUtil.generateToken(userDetails);
		FSContext.createAuthenticatedSession(user);
		return new ResponseEntity<Object>(new LoginWithKey(key,userTo), HttpStatus.OK);
	}


	class LoginWithKey {
		private String aceess_key;
		private AuthonticatedUserTo userTo;
		LoginWithKey(String aceess_key,AuthonticatedUserTo userTo){
			this.aceess_key=aceess_key;
			this.userTo=userTo;
		}
		public String getAceess_key() {
			return aceess_key;
		}
		public void setAceess_key(String aceess_key) {
			this.aceess_key = aceess_key;
		}
		public AuthonticatedUserTo getUserDto() {
			return userTo;
		}
		public void setUserDto(AuthonticatedUserTo userTo) {
			this.userTo = userTo;
		}
	}


}
