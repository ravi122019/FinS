package com.fs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fs.dto.base.BaseDto;

public class FirmDto extends BaseDto{
	
	@JsonProperty("name")
	private String name;

	@JsonProperty("id")
    private Long id;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
