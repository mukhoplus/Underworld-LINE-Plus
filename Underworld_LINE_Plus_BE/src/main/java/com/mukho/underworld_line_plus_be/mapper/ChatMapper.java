package com.mukho.underworld_line_plus_be.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.underworld_line_plus_be.dto.chat.ChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.SendChatDto;

@Mapper
public interface ChatMapper {

	List<ChatDto> getChatList(int roomId);

	int sendChat(SendChatDto sendChatDto);

	int sendSelfChat(SendChatDto sendChatDto);

	void readChat(SendChatDto sendChatDto);

}
