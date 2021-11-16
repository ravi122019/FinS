package com.fs.to;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fs.to.base.BaseTo;

public class DesignationTo extends BaseTo{

	
	@NotNull(message="Designation should not be null.")
	@NotEmpty(message="Designation should not be empty.")
	@JsonProperty("name")
	private String name;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
