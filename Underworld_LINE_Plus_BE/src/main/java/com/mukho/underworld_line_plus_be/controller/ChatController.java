package com.mukho.underworld_line_plus_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mukho.underworld_line_plus_be.service.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController {

	@Autowired
	private ChatService chatService;

	@GetMapping("/{roomId}")
	public ResponseEntity<?> getChatList(@PathVariable int roomId) {
		return ResponseEntity.ok(chatService.getChatList(roomId));
	}

}
