package com.mukho.underworld_line_plus_be.service;

import java.util.List;

import com.mukho.underworld_line_plus_be.dto.user.LoginDto;
import com.mukho.underworld_line_plus_be.dto.user.LoginUserDto;
import com.mukho.underworld_line_plus_be.dto.user.SignupDto;
import com.mukho.underworld_line_plus_be.dto.user.UserListDto;

public interface UserService {

	int signup(SignupDto signupDto);

	LoginUserDto login(LoginDto loginDto);

	int getUserId(String id);

	List<UserListDto> getUserList();

	boolean duplicateCheckId(String id);

	boolean duplicateCheckName(String name);

}
