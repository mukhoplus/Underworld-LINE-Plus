package com.mukho.underworld_line_plus_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class UnderworldLinePlusBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnderworldLinePlusBeApplication.class, args);
	}

}
