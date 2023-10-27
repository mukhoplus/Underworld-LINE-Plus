package com.mukho.underworld_line_plus_be.dto.chat;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ChatDto {

	int sendUserId;
	String message;
	int notRead;
	LocalDateTime sendAt;

}
