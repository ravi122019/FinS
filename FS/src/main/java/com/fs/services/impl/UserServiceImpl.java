package com.fs.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.fs.constants.RoleConstants;
import com.fs.pojo.Firm;
import com.fs.pojo.Role;
import com.fs.pojo.User;
import com.fs.repos.RoleRepo;
import com.fs.repos.UserRepo;
import com.fs.services.UserService;
import com.fs.services.base.impl.ServiceImpl;

@Service
public class UserServiceImpl extends ServiceImpl<User> implements UserService{

	@Autowired
	protected UserRepo userRepo;
	
	@Autowired
	protected RoleRepo roleRepo;
	
	@Override
	protected JpaRepository<User, Long> getRepo() {
		return userRepo;
	}
	
	@Override
	public User getUserByLoginName(String loginName) {
		return userRepo.findByLoginName(loginName).orElse(null);
	}

	@Override
	public User getUserByLoginNameAndPassword(String loginName, String password) {
		return userRepo.findByLoginNameAndPassword(loginName, password).orElse(null);
	}

	@Override
	public List<User> getUserByFirmId(Long firmId) {
		return userRepo.findByFirm_Id(firmId);
	}

	@Override
	public void createUserForNewFirm(Firm firm) {
		List<User> firmUsers = getUserByFirmId(firm.getId());
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
			super.save(user);
		}

	}
}
