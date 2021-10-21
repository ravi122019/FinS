package com.fs.context;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class SystemSessionScope implements SessionScope<Map<String, Object>>{

	private Map<String, Object> session = new HashMap<String, Object>();
	private String sessionId= null;
	@Override
	public void put(String key, Serializable value) {
		session.put(key, value);
	}

	@Override
	public void remove(String key) {
		session.remove(key);
	}

	@Override
	public Map<String, Object> getSource() {
		return session;
	}

	@Override
	public String getSessionId() {
		return sessionId;
	}

	@Override
	public Serializable get(String key) {
		return (Serializable) session.get(key);
	}

	public static String generatedSessionId() {
		return UUID.randomUUID().toString();
	}

	public void setSessionId(String newSessionId) {
		this.sessionId=newSessionId;
	}

}
