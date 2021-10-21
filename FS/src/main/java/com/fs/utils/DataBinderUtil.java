package com.fs.utils;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DataBinderUtil {
	
	ObjectMapper objectMapper = new ObjectMapper().configure(
			DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object toBusiness(Object domain, Class businessClass) {
		return objectMapper.convertValue(domain, businessClass);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object toDomain(Object business, Class domainClass) {
		return objectMapper.convertValue(business, domainClass);
	}

}
