package com.mukho.underworld_line_plus_be.dto.chat;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SocketSendDto {

	String type;
	SendChatDto data;

}
