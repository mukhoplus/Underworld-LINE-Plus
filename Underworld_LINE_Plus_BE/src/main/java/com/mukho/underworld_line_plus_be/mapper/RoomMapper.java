package com.mukho.underworld_line_plus_be.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mukho.underworld_line_plus_be.dto.room.RoomDto;

@Mapper
public interface RoomMapper {

	int createRoom(String identifier);

	int isExistRoom(String identifier);

	int updateRoom(int roomId, String message);

	String getIdentifier(int roomId);

	List<RoomDto> getRoomListByUserId(int userId);

	int getRoomIdByIdentifier(String identifier);

}
