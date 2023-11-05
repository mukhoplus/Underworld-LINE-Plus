package com.mukho.underworld_line_plus_be.dto.room;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Room {

	int roomId;
	String identifier;
	String lastMessage;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "KST")
	LocalDateTime updatedAt;

}
