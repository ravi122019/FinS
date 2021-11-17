package com.fs.controller.base;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.fs.services.base.Service;
import com.fs.utils.DataBinderUtil;
import com.fs.utils.QueryParamUtil;
@Validated
public abstract class BaseController<B, D> {

	protected abstract Service<D> getService();
	
	@SuppressWarnings("rawtypes")
	protected abstract Class getBusinessObject();
	
	@SuppressWarnings("rawtypes")
	protected abstract Class getDomainObject();
	
	@Autowired
	private DataBinderUtil binder;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public <T> ResponseEntity<List> getAll(@RequestParam Map<String, String> map) {
		List<Object> list = new ArrayList<Object>();
		List<D> domainList = getService().findAll(QueryParamUtil.getExampleObject(getDomainObject(), map));
		if (!domainList.isEmpty()) {
			for (D d : domainList) {
				list.add(binder.toBusiness(d, getBusinessObject()));
			}
		}

		return new ResponseEntity<List>(list, HttpStatus.OK);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(path = "/getPageList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page> getAllPages(@RequestParam Map<String, String> map) {
			Page<D> sortedList = getService().getPageList(QueryParamUtil.getExampleObject(getDomainObject(), map),
					QueryParamUtil.getPageable(map));
		return new ResponseEntity<Page>(sortedList, HttpStatus.OK);
	}
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> save(@RequestBody B object){
		Object result = binder.toDomain(object, getDomainObject());
		D d = (D) result;
		QueryParamUtil.setFirmData(d);
		getService().save(d);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findById(@PathVariable Long id){
		Object obj = getService().findById(id);
		Object result = binder.toBusiness(obj, getBusinessObject());
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> update(@Valid @RequestBody B object, @PathVariable Long id){
		D d = getService().findById(id);
		BeanUtils.copyProperties(object, d);
		QueryParamUtil.setFirmData(d);
		getService().save(d);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity delete(@RequestBody B object){
		Object entity = binder.toDomain(object, getDomainObject());
		D d = (D) entity;
		getService().delete(d);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	
}