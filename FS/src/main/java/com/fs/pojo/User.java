package com.fs.pojo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.fs.pojo.base.impl.FirmAwareImpl;
@Entity
@Table(name="FSUSER", uniqueConstraints = @UniqueConstraint(columnNames = "id"))
public class User extends FirmAwareImpl{
	private static final long serialVersionUID = -1372725641329675387L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull(message = "LoginName should not be null")
	@Column(name = "LoginName")
	private String loginName;
	
	@NotNull(message = "Password should not be null")
	@Column(name = "password")
	private String password;
	
	@NotNull(message = "ConfirmPassword should not be null")
	@Column(name = "ConfirmPassword")
	private String confirmPassword;
	
	@Column(name = "FirstName" , nullable = false, unique = false)
	private String firstName;
	
	@Column(name = "MiddleName" , nullable = true, unique = false)
	private String middleName;
	
	@Column(name = "LastName" , nullable = false, unique = false)
	private String lastName;
	
	@Column(name = "MobileNumber" , nullable = false, unique = false)
	private String mobileNumber;
	
	@Column(name = "EmialId" , nullable = false, unique = false)
	private String emialId;
	
	@Column(name = "Aadhar" , nullable = false, unique = false)
	private String aadhar;
	
	@Column(name = "State" , nullable = false, unique = false)
	private String state;
	
	@Column(name = "District",nullable = false, unique = false)
	private String district;
	
	@Column(name = "City" , nullable = false, unique = false)
	private String city;
	
	@Column(name = "Address" , nullable = false, unique = false)
	private String address;
	
	@Column(name = "DateOfBirth" , nullable = false, unique = false)
	private Date dateOfBirth;
	
	@Column(name = "DateOfJoining" , nullable = false, unique = false)
	private Date dateOfJoining;
	
	@Column(name = "CTC" , nullable = false, unique = false)
	private BigDecimal ctc;
	
	@Column(name = "BloodGroup" , nullable = false, unique = false)
	private String bloodGroup;
	
	@Column(name = "UserProfileImg" , nullable = true, unique = false)
	private byte[] userProfileImg;
	
	@Column(name = "UserCode" , nullable = false, unique = false)
	private String userCode;
	
	@ManyToOne(cascade=CascadeType.ALL) 
	@JoinColumn(name = "DesignationId", referencedColumnName = "id")
	private Designation designation;
	
	@ManyToMany
	@JoinTable(name = "users_roles", 
	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), 
	inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmialId() {
		return emialId;
	}

	public void setEmialId(String emialId) {
		this.emialId = emialId;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Date getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(Date dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public BigDecimal getCtc() {
		return ctc;
	}

	public void setCtc(BigDecimal ctc) {
		this.ctc = ctc;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public byte[] getUserProfileImg() {
		return userProfileImg;
	}

	public void setUserProfileImg(byte[] userProfileImg) {
		this.userProfileImg = userProfileImg;
	}

	public String getUserCode() {
		//userCode = "F"+getFirmId()+"E"+getId();
		return userCode;
	}

	public void setUserCode(String userCode) {
		userCode = "F"+getFirmId()+"E"+getId();
		this.userCode = userCode;
	}

	public Designation getDesignation() {
		return designation;
	}

	public void setDesignation(Designation designation) {
		this.designation = designation;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
}
