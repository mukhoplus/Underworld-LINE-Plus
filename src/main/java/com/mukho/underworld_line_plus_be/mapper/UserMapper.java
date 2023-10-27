package com.mukho.underworld_line_plus_be.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.underworld_line_plus_be.dto.user.LoginDto;
import com.mukho.underworld_line_plus_be.dto.user.SignupDto;
import com.mukho.underworld_line_plus_be.dto.user.User;
import com.mukho.underworld_line_plus_be.dto.user.UserListDto;

@Mapper
public interface UserMapper {

	int signup(SignupDto signupDto);

	User login(LoginDto loginDto);

	int getUserId(String id);

	List<UserListDto> getUserList();

	int duplicateCheckId(String id);

	int duplicateCheckName(String name);

}
