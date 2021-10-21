package com.fs.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fs.filter.JwtRequestFilter;
import com.fs.services.base.FSUserLoginDetailsService;

@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired 
	FSUserLoginDetailsService userDetailService;
	
	@Autowired
	JwtRequestFilter jwtRequestFilter;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*http
		.csrf().disable()
		.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS).permitAll()
			.antMatchers("/login/authenticate").permitAll()
			.antMatchers("/login/addLogin").permitAll()
			.antMatchers("/fs/firm/getPageList").permitAll()
			.antMatchers("/appResetPassword/sendOTP/*").permitAll()
			.antMatchers("/appResetPassword/resetPassword/").permitAll()
			.anyRequest(). authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
	http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
*/	
			http.csrf().disable();
	        http.authorizeRequests().antMatchers("/getPageList","/fs/firm").permitAll();
	          
			
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder(){
		return NoOpPasswordEncoder.getInstance();
	}
}
