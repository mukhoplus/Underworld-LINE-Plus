package com.mukho.underworld_line_plus_be.dto.room;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Room {

	int roomId;
	String identifier;
	String lastMessage;
	LocalDateTime updatedAt;

}
