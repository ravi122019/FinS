package com.fs.pojo.base;

public interface FirmAware extends Trackable{

	public static final String FIRM_ID = "firmId";
	public abstract Long getFirmId();
	public abstract void setFirmId(Long firmId);
}
