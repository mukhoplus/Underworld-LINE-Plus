package com.mukho.underworld_line_plus_be.service;

import java.util.List;

import com.mukho.underworld_line_plus_be.dto.chat.ChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.SendChatDto;

public interface ChatService {

	List<ChatDto> getChatList(int roomId);

	int sendChat(SendChatDto sendChatDto);

	void readChat(SendChatDto sendChatDto);

}
