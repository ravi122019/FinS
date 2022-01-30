package com.fs.controller.rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fs.controller.base.BaseController;
import com.fs.pojo.Firm;
import com.fs.services.FirmService;
import com.fs.services.base.Service;
import com.fs.to.FirmTo;
@RestController
@RequestMapping("/firm")
public class FirmController extends  BaseController<FirmTo, Firm>{
	
	@Autowired
	private FirmService service;
	
	/*
	 * @Override protected Example<Firm> getExample(Map<String, String> map) { Firm
	 * firm =new Firm(); firm.setName("implement"); Example<Firm> domain =
	 * Example.of(firm); return domain; }
	 */
	

	@SuppressWarnings("rawtypes")
	@Override
	protected Class getBusinessObject() {
		return FirmTo.class;
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	protected Class getDomainObject() {
		return Firm.class;
	}

	@Override
	protected Service<Firm> getService() {
		return service;
	}
	
	@SuppressWarnings({ "hiding", "rawtypes" })
	@PreAuthorize("hasAuthority('Master')")
	@Override
	public <FirmTo> ResponseEntity<List> getAll(Map<String, String> map) {
		return super.getAll(map);
	}

}
