package com.fs.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="FSSTATECITY", uniqueConstraints = @UniqueConstraint(columnNames = {"state", "city"}))
public class StateCity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7669284695939102858L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull(message = "State should not be null")
	@Column(name = "State")
	private String state;
	
	@NotNull(message = "City should not be null")
	@Column(name = "City")
	private String city;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
}
