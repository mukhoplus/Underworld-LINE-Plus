package com.mukho.underworld_line_plus_be.dto.chat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mukho.underworld_line_plus_be.dto.room.RoomDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SocketResponseDto {

	List<RoomDto> roomList;
	List<ChatDto> chatList;

}
