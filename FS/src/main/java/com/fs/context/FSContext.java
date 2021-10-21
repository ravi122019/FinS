package com.fs.context;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpSession;


public abstract class FSContext {

	private static final ThreadLocal<FSContext> INSTANCE = new ThreadLocal<FSContext>();
	private static final FSContext DEFAULT_INSTANCE = new NullFSContext();
	private RequestScope<?> request;
	
	public FSContext(RequestScope<?> request) {
		setRequest(request);
		setCurrentInstance(this);
	}
	
	public FSContext() {
		this(new NullRequestScope());
	}
	
	private void setRequest(RequestScope<?> request2) {
		if(null == request2) {
			throw new IllegalStateException("Request scope can not be null");
		}
		this.request=request2;
	}

	public RequestScope<?> getRequest() {
		return request;
	}

	public static void setCurrentInstance(FSContext ctx) {
		INSTANCE.set(ctx);
	}
	
	public static FSContext current() {
		FSContext instance = INSTANCE.get();
		return null == instance ? DEFAULT_INSTANCE : instance;
	}
	
	public static RequestScope<?> currenRequest() {
		return current().getRequest();
	}
	
	public static SessionScope<?> currentSession(){
		return current().getSession();
	}
	public SessionScope<?> getSession(){
		return getSession(false);
	}
	
	public abstract SessionScope<?> getSession(boolean create);
	public abstract void invalidateSession();
	
	public static FSContext getCurrentInstance() {
		return current();
	}
	
	public static SessionScope<?> createAuthenticatedSession(String principal){
		final FSContext context = current();
		SessionScope<?> session = null;
		invalidateAuthenticatedSession();
		
		session=context.getSession(true);
		session.put("loginName", principal);
		if(session.getSource() instanceof HttpSession) {
			Long timeout = 15L * 60L;
			((HttpSession)session.getSource()).setMaxInactiveInterval(timeout.intValue());
		}
		
		return session;
	}
	
	public static void invalidateAuthenticatedSession() {
		current().invalidateSession();
	}
	
	
	private static class NullFSContext extends FSContext{
		
		public NullFSContext() {
			super(new NullRequestScope());
		}

		@Override
		public SessionScope<?> getSession(boolean create) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public void invalidateSession() {
			// TODO Auto-generated method stub
			
		}
	}
	private static final class NullRequestScope implements RequestScope<Map<String,String>> {

		@Override
		public void put(String key, Object value) {
		}

		@Override
		public void remove(String key) {
		}

		@Override
		public Map<String, String> getSource() {
			// TODO Auto-generated method stub
			return Collections.emptyMap();
		}

		@Override
		public Object get(String key) {
			return null;
		}
		
	}
}
 