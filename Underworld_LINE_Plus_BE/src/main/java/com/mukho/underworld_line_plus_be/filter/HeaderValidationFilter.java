package com.mukho.underworld_line_plus_be.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class HeaderValidationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws
		ServletException, IOException {

		if (!("websocket".equalsIgnoreCase(request.getHeader("Upgrade")) &&
			"Upgrade".equalsIgnoreCase(request.getHeader("Connection")))) {

			String mukhoAuthToken = request.getHeader("Mukho-Auth-Token");

			if (mukhoAuthToken == null || !mukhoAuthToken.equals("Underworld")) {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				return;
			}
		}

		filterChain.doFilter(request, response);
	}

}
