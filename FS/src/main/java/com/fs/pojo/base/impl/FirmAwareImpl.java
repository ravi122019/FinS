package com.fs.pojo.base.impl;

import java.io.Serializable;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.fs.pojo.Firm;
import com.fs.pojo.base.FirmAware;
@MappedSuperclass
public class FirmAwareImpl extends TrackableImpl implements FirmAware, Serializable{
	
	private static final long serialVersionUID = -1869322062604104688L;

	private static String FIRM_ID="firm.id";
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="FirmID", nullable = false, updatable = false)
	private Firm firm;
	
	public Firm getFirm() {
		return firm;
	}

	public void setFirm(Firm firm) {
		this.firm = firm;
	}
	
	@Transient
	public Long getFirmId() {
		if(getFirm()!=null) {
			return getFirm().getId();
		}
		return null;
	}

	@Override
	public void setFirmId(Long firmId) {
		if(getFirm()==null) {
			this.setFirm(new Firm());
		}
		
		this.getFirm().setId(firmId);
		
	}
}
