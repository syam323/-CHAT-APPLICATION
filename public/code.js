(function() {
  const app = document.querySelector(".app");
  const socket = io();

  let uname;

  const joinScreen = app.querySelector(".join-screen");
  const chatScreen = app.querySelector(".chat-screen");
  const joinBtn = app.querySelector("#join-user");
  const exitBtn = app.querySelector("#exit-chat");
  const messageInput = app.querySelector("#message-input");
  const sendBtn = app.querySelector("#send-message");
  const messagesContainer = app.querySelector(".messages");
  const usernameInput = app.querySelector("#Username");

  // Join button click handler
  joinBtn.addEventListener("click", () => {
    const enteredUsername = usernameInput.value.trim();
    if (!enteredUsername) {
      alert("Please enter username");
      return;
    }
    uname = enteredUsername;
    socket.emit("newuser", uname);

    // UI updates
    joinScreen.classList.remove("active");
    chatScreen.classList.add("active", "joined");

    messageInput.focus();
  });

  // Exit chat button click handler
  exitBtn.addEventListener("click", () => {
    socket.emit("exituser");
    joinScreen.classList.add("active");
    chatScreen.classList.remove("active", "joined");
    messagesContainer.innerHTML = "";
    usernameInput.value = "";
    messageInput.value = "";
    uname = null;
  });

  // Send message function
  function sendMessage() {
    const msg = messageInput.value.trim();
    if (!msg) return;

    appendMessage(uname, msg, true);
    socket.emit("chat", msg);
    messageInput.value = "";
  }

  // Send button click and enter key bindings
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Append chat message
  function appendMessage(name, message, isMyMsg) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message");
    messageEl.classList.add(isMyMsg ? "my-message" : "other-message");

    messageEl.innerHTML = `<div>
                              <div class="name">${escapeHtml(name)}</div>
                              <div class="text">${escapeHtml(message)}</div>
                           </div>`;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Append system update message
  function appendUpdate(message) {
    const updateEl = document.createElement("div");
    updateEl.classList.add("update");
    updateEl.textContent = message;
    messagesContainer.appendChild(updateEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // HTML escape to prevent injection
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Listen for chat messages from others
  socket.on("chat", ({ username, message }) => {
    if (username !== uname) {
      appendMessage(username, message, false);
    }
  });

  // Listen for user join/leave notifications
  socket.on("update", (msg) => {
    appendUpdate(msg);
  });
})();
