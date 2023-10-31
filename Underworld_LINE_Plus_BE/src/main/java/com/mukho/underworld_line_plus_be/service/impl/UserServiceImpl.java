package com.mukho.underworld_line_plus_be.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mukho.underworld_line_plus_be.dto.user.LoginDto;
import com.mukho.underworld_line_plus_be.dto.user.LoginUserDto;
import com.mukho.underworld_line_plus_be.dto.user.SignupDto;
import com.mukho.underworld_line_plus_be.dto.user.User;
import com.mukho.underworld_line_plus_be.dto.user.UserListDto;
import com.mukho.underworld_line_plus_be.mapper.UserMapper;
import com.mukho.underworld_line_plus_be.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public String hashPassword(String plainPassword) {
		return bCryptPasswordEncoder.encode(plainPassword);
	}

	public boolean checkPassword(String plainPassword, String hashedPassword) {
		return bCryptPasswordEncoder.matches(plainPassword, hashedPassword);
	}

	@Override
	public int signup(SignupDto signupDto) {
		String plainPassword = signupDto.getPassword();
		signupDto.setPassword(hashPassword(plainPassword));
		return userMapper.signup(signupDto);
	}

	@Override
	public LoginUserDto login(LoginDto loginDto) {

		User user = userMapper.login(loginDto);
		if (user == null) {
			return null;
		}

		String plainPassword = loginDto.getPassword();
		if (!checkPassword(plainPassword, user.getPassword())) {
			return null;
		}

		int userId = user.getUserId();
		String id = user.getId();
		String name = user.getName();

		return new LoginUserDto(userId, id, name);
	}

	@Override
	public int getUserId(String id) {
		return userMapper.getUserId(id);
	}

	@Override
	public List<UserListDto> getUserList() {
		return userMapper.getUserList();
	}

	@Override
	public boolean duplicateCheckId(String id) {
		if (userMapper.duplicateCheckId(id) == 0) {
			return false;
		}
		return true;
	}

	@Override
	public boolean duplicateCheckName(String name) {
		if (userMapper.duplicateCheckName(name) == 0) {
			return false;
		}
		return true;
	}
}
