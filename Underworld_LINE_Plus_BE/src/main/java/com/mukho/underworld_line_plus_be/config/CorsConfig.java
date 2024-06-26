package com.mukho.underworld_line_plus_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins("https://localhost")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
					.allowCredentials(true)
					.allowedHeaders("*");
			}
		};
	}

}
