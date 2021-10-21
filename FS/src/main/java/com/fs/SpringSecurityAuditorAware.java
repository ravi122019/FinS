package com.fs;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class SpringSecurityAuditorAware implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {
		return Optional.ofNullable("Admin").filter(s -> !s.isEmpty());
	}
	
}