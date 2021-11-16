package com.fs.pojo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fs.pojo.base.impl.FirmAwareImpl;

@Entity
@Table(name="FSDESIGNATION", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
public class Designation extends FirmAwareImpl{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3666448265299965603L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "Name", nullable = false, unique = false)
	private String name;
	
	@OneToOne(cascade=CascadeType.ALL)  
    private User user;  

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
