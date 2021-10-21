package com.fs.context;

import java.io.Serializable;

public interface SessionScope<T> extends Scope<Serializable> {
	public T getSource();
	public String getSessionId();
	
	@Override
	public Serializable get(String key);
}
