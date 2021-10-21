package com.fs.services.base;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fs.pojo.User;

public class FSUserLoginDetails implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8605138666500556897L;
	private String userName;
	private String password;

	public FSUserLoginDetails(String userName, String password){
		this.userName = userName;
		this.password = password;
	}
	
	public FSUserLoginDetails(){
		
	};
	public FSUserLoginDetails(User loginUser) {
		this.userName=loginUser.getUserName();
		this.password=loginUser.getPassword();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
