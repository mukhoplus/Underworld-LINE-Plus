package com.mukho.underworld_line_plus_be.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.underworld_line_plus_be.dto.user.LoginDto;
import com.mukho.underworld_line_plus_be.dto.user.LoginUserDto;
import com.mukho.underworld_line_plus_be.dto.user.SignupDto;
import com.mukho.underworld_line_plus_be.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	public void setSession(HttpServletRequest request, LoginUserDto loginUserDto) {
		HttpSession session = request.getSession();
		session.setAttribute("loginUser", loginUserDto);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignupDto signupDto, HttpServletRequest request) {
		try {
			if (userService.signup(signupDto) == 0) {
				throw new Exception();
			}

			int userId = userService.getUserId(signupDto.getId());
			String id = signupDto.getId();
			String name = signupDto.getName();

			LoginUserDto loginUserDto = new LoginUserDto(userId, id, name);
			setSession(request, loginUserDto);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletRequest request) {
		try {
			LoginUserDto loginUserDto = userService.login(loginDto);

			if (loginUserDto == null) {
				throw new Exception();
			}

			setSession(request, loginUserDto);
			return ResponseEntity.ok(loginUserDto);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();
		return ResponseEntity.ok().build();
	}

	@GetMapping("/list")
	public ResponseEntity<?> getList() {
		try {
			return ResponseEntity.ok(userService.getUserList());
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<?> duplicateCheckId(@PathVariable String id) {
		try {
			return ResponseEntity.ok(userService.duplicateCheckId(id));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

	@GetMapping("/name/{name}")
	public ResponseEntity<?> duplicateCheckName(@PathVariable String name) {
		try {
			return ResponseEntity.ok(userService.duplicateCheckName(name));
		} catch (Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}

}
