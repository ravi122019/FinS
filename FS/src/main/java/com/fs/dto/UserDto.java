package com.fs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fs.dto.base.BaseDto;

public class UserDto extends BaseDto{

	@JsonProperty("id")
	private Long id;
	@JsonProperty("userName")
	private String userName;
	@JsonProperty("password")
	private String password;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
