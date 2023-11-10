export const isInNotReadMessages = (userId, newMessages) => {
  return newMessages.some(
    (message) => message.sendUserId !== userId && message.notRead === 1
  );
};
