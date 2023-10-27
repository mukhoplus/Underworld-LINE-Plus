package com.mukho.underworld_line_plus_be.service;

import java.util.List;

import com.mukho.underworld_line_plus_be.dto.room.RoomDto;

public interface RoomService {

	int createRoom(String identifier);

	boolean isExistRoom(String identifier);

	void updateRoom(int roomId, String message);

	String getIdentifier(int roomId);

	List<RoomDto> getRoomListByUserId(int userId);

	int getRoomIdByUserId(int userId);

}
