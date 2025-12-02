const chatService = {
  getMessages: (token) =>
    Http.request(`/api/chat`, { token }),

  sendMessage: (token, texto) =>
    Http.request(`/api/chat`, {
      method: "POST",
      token,
      body: { texto }
    })
};
window.chatService = chatService;