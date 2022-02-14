package com.fs.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.NotWritablePropertyException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.fs.context.FSContext;
import com.fs.pojo.base.FirmAware;

public final class QueryParamUtil {

	@SuppressWarnings("rawtypes")
	public static Example getExampleObject(Class clz, Map<String, String> map) {
		BeanWrapper src = new BeanWrapperImpl(clz);
		String crit = map.get("crit");
		if(crit != null) {
			String[] fields=crit.split(",");
			for (String field : fields) {
				String[] fld=field.split("=");
				try {
					src.setPropertyValue(fld[0], fld[1]);
				} catch (NotWritablePropertyException e) {
					System.out.println(""+e.getMessage());
				}
			}
		}
		Object obj = src.getWrappedInstance();
		if(obj instanceof FirmAware) {
			FirmAware firm = (FirmAware) obj;
			firm.setFirmId(FSContext.getFirmId());
			firm.setDeleteStatus(Boolean.FALSE);
			return Example.of(firm);
		}
		
		return Example.of(obj);
	}
	
	@SuppressWarnings("rawtypes")
	public static List<Example> getFirmExamples(Class clz) {
		List<Example> examples = new ArrayList<Example>();
		BeanWrapper src = new BeanWrapperImpl(clz);
		Object obj = src.getWrappedInstance();
		if(obj instanceof FirmAware) {
			FirmAware baseFirm = (FirmAware) obj;
			baseFirm.setFirmId(1l);
			baseFirm.setDeleteStatus(Boolean.FALSE);
			
			FirmAware userFirm = (FirmAware) obj;
			userFirm.setFirmId(FSContext.getFirmId());
			userFirm.setDeleteStatus(Boolean.FALSE);
			
			examples.add(Example.of(baseFirm));
			examples.add(Example.of(userFirm));
		}
		
		return examples;
	}
	
	
	
	public static Pageable getPageable(Map<String, String> map) {
		//TODO:limit=value
		//offset=value
		//sort=
		return PageRequest.of(0, 25, Sort.by("id"));
		
	}
	//TODO:We will remove this method and will add advice for this
	public static void setFirmData(Object object) {
		if(object instanceof FirmAware) {
			FirmAware obj = (FirmAware) object;
			obj.setFirm(FSContext.getFirm());
		}
	}
}
