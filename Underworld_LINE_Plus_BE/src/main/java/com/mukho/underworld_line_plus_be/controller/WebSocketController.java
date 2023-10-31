package com.mukho.underworld_line_plus_be.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mukho.underworld_line_plus_be.dto.chat.ChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.SendChatDto;
import com.mukho.underworld_line_plus_be.dto.chat.SocketResponseDto;
import com.mukho.underworld_line_plus_be.dto.chat.SocketSendDto;
import com.mukho.underworld_line_plus_be.dto.room.RoomDto;
import com.mukho.underworld_line_plus_be.dto.user.LoginUserDto;
import com.mukho.underworld_line_plus_be.service.ChatService;
import com.mukho.underworld_line_plus_be.service.RoomService;

@Component
public class WebSocketController extends TextWebSocketHandler {

	private Map<Integer, WebSocketSession> sessions = new HashMap<>();

	private RoomService roomService;

	private ChatService chatService;

	@Autowired
	public WebSocketController(RoomService roomService, ChatService chatService) {
		this.roomService = roomService;
		this.chatService = chatService;
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		try {
			HttpSession curUserSession = (HttpSession) session.getAttributes().get("httpSession");

			LoginUserDto loginUserDto = (LoginUserDto)curUserSession.getAttribute("loginUser");
			int userId = loginUserDto.getUserId();
			session.getAttributes().put("userId", userId);

			super.afterConnectionEstablished(session);
			sessions.put(userId, session);
		} catch(Exception e) {

		}

	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		try {
			HttpSession curUserSession = (HttpSession) session.getAttributes().get("httpSession");
			LoginUserDto loginUserDto = (LoginUserDto)curUserSession.getAttribute("loginUser");
			int userId = loginUserDto.getUserId();

			super.afterConnectionClosed(session, status);
			sessions.remove(userId);
			// curUserSession.invalidate();
		} catch (Exception e) {

		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage testMessage) throws Exception {
		String receivedMessage = testMessage.getPayload();
		ObjectMapper objectMapper = new ObjectMapper();

		SocketSendDto socketSendDto = objectMapper.readValue(receivedMessage, SocketSendDto.class);
		SendChatDto sendChatDto = socketSendDto.getData();

		int roomId = sendChatDto.getRoomId();
		int sendUserId = sendChatDto.getSendUserId();

		if (socketSendDto.getType().equals("chat")) {
			String message = sendChatDto.getMessage();

			roomService.updateRoom(roomId, message);
			chatService.sendChat(new SendChatDto(roomId, sendUserId, message));
		} else {
			chatService.readChat(new SendChatDto(roomId, sendUserId, ""));
		}

		String identifier = roomService.getIdentifier(roomId);
		int receiveUserId = getReceiveUserId(identifier, sendUserId);

		objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());

		List<RoomDto> sendRoomList = getRoomListByUserId(sendUserId);
		List<RoomDto> receiveRoomList = getRoomListByUserId(receiveUserId);
		List<ChatDto> chatList = getChatList(roomId);

		SocketResponseDto sendUserDto = new SocketResponseDto(sendRoomList, chatList);
		SocketResponseDto receiveUserDto = new SocketResponseDto(receiveRoomList, chatList);

		sessions.get(sendUserId).sendMessage(new TextMessage(objectMapper.writeValueAsString(sendUserDto)));
		if (sessions.containsKey(receiveUserId)) {
			sessions.get(receiveUserDto).sendMessage(new TextMessage(objectMapper.writeValueAsString(sendUserDto)));
		}

	}

	public int getReceiveUserId(String identifier, int sendUserId) {
		String[] userIds = identifier.split("-");

		if (Integer.parseInt(userIds[0]) == sendUserId) {
			return Integer.parseInt(userIds[1]);
		}
		return Integer.parseInt(userIds[0]);
	}

	public List<RoomDto> getRoomListByUserId(int userId) {
		return roomService.getRoomListByUserId(userId);
	}

	public List<ChatDto> getChatList(int roomId) {
		return chatService.getChatList(roomId);
	}

}
