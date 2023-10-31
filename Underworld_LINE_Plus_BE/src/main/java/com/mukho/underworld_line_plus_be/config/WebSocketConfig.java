package com.mukho.underworld_line_plus_be.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.mukho.underworld_line_plus_be.controller.WebSocketController;
import com.mukho.underworld_line_plus_be.service.ChatService;
import com.mukho.underworld_line_plus_be.service.RoomService;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	@Autowired
	private RoomService roomService;

	@Autowired
	private ChatService chatService;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new WebSocketController(roomService, chatService), "/socket")
				.setAllowedOrigins("*")
				.addInterceptors(new HttpSessionHandshakeInterceptor());
	}

}
