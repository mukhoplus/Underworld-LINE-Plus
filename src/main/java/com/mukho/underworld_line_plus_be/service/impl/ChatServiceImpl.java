package com.mukho.underworld_line_plus_be.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mukho.underworld_line_plus_be.dto.chat.ChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.ReadChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.SendChatDto;
import com.mukho.underworld_line_plus_be.mapper.ChatMapper;
import com.mukho.underworld_line_plus_be.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatMapper chatMapper;

	@Override
	public List<ChatDto> getChatList(int roomId) {
		return chatMapper.getChatList(roomId);
	}

	@Override
	public int sendChat(SendChatDto sendChatDto) {
		return chatMapper.sendChat(sendChatDto);
	}

	@Override
	public void readChat(ReadChatDto readChatDto) {
		chatMapper.readChat(readChatDto);
	}

}
