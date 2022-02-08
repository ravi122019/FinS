package com.fs.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fs.constants.RoleConstants;
import com.fs.pojo.Firm;
import com.fs.pojo.Role;
import com.fs.pojo.User;
import com.fs.repos.FirmRepo;
import com.fs.repos.RoleRepo;
import com.fs.services.FirmService;
import com.fs.services.UserService;
import com.fs.services.base.impl.ServiceImpl;
@Service
public class FirmServiceImpl extends ServiceImpl<Firm> implements FirmService{

	@Autowired
	protected FirmRepo firmRepo;
	
	@Autowired
	protected RoleRepo roleRepo;
	
	@Autowired
	protected UserService userService;

	@Override
	protected JpaRepository<Firm, Long> getRepo() {
		return firmRepo;
	}
	
	@Override
	@Transactional
	public Firm save(Firm firm) {

		User exampleUser = new User();
		exampleUser.setFirm(firm);
		List<User> firmUsers = userService.findAll(Example.of(exampleUser));
		firm.setIsActive(true);
		firmRepo.save(firm);
		if (firmUsers != null && firmUsers.isEmpty()) {
			User user = new User();
			user.setLoginName(firm.getMobileNumber());
			user.setPassword(firm.getMobileNumber().toString());
			user.setConfirmPassword(firm.getMobileNumber().toString());
			Set<Role> roles = new HashSet<Role>();
			Role adminRole = roleRepo.findByName(RoleConstants.ADMINISTRATOR_ROLE);
			roles.add(adminRole);
			user.setRoles(roles);
			user.setState(firm.getState());
			user.setCity(firm.getCity());
			user.setAddress(firm.getAddress());
			user.setEmialId(firm.getEmailId());
			user.setDistrict(firm.getDistrict());
			user.setMobileNumber(firm.getMobileNumber());
			user.setFirm(firm);
			userService.save(user);
		}
		return firm;
	}
	
}
