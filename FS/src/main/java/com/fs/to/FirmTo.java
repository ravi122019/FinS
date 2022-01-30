package com.fs.to;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fs.to.base.BaseTo;

public class FirmTo extends BaseTo {

	@JsonProperty("firmId")
	@JsonAlias("id")
	private Long id;

	@JsonProperty("name")
	private String name;

	@JsonProperty("mobileNumber")
	private String mobileNumber;

	@JsonProperty("emailId")
	private String emailId;

	@JsonProperty("city")
	private String city;

	@JsonProperty("state")
	private String state;
	
	@JsonProperty("district")
	private String district;

	@JsonProperty("address")
	private String address;

	@JsonProperty("registrationId")
	private String registrationId;

	@JsonProperty("pancard")
	private String pancard;

	@JsonProperty("registrationDate")
	private Date registrationDate;

	@JsonProperty("reNewDueDate")
	private Date reNewDueDate;

	@JsonProperty("myReferralCode")
	private String myReferralCode;

	@JsonProperty("referredBy")
	private String referredBy;

	@JsonProperty("isActive")
	private Boolean isActive;

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

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public String getPancard() {
		return pancard;
	}

	public void setPancard(String pancard) {
		this.pancard = pancard;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

	public Date getReNewDueDate() {
		return reNewDueDate;
	}

	public void setReNewDueDate(Date reNewDueDate) {
		this.reNewDueDate = reNewDueDate;
	}

	public String getMyReferralCode() {
		return myReferralCode;
	}

	public void setMyReferralCode(String myReferralCode) {
		this.myReferralCode = myReferralCode;
	}

	public String getReferredBy() {
		return referredBy;
	}

	public void setReferredBy(String referredBy) {
		this.referredBy = referredBy;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}
}
