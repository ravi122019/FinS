package com.fs.repos;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.fs.pojo.User;
import com.fs.repos.base.BaseRepo;
@Repository
public interface UserRepo extends BaseRepo<User, Long>{

	Optional<User> findByLoginName(String loginName);

}
