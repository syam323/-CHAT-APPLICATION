# -CHAT-APPLICATION

COMPANY: CODTECH IT SOLUTIONS

Intern Name: Nimmadi Syam

Intern ID: CT08DF832

Domain: Full Stack Web Development

Duration: 8 Weeks

Mentor: Neela Santhosh

📌 Project Description

    A minimal real-time chat application built with Node.js, Express, and Socket.IO. Users enter a username, 
    join the chatroom, and exchange live messages. The interface is sleek and responsive, with proper transitions
    between login and chat views.

Features

    Real-time messaging between multiple users

    2Enter username to join the chat

    "Chatroom" heading visible only after joining the chat

    Join/leave notifications

    Exit back to the login screen at any time

    Simple, centered, compact UI

Installation

       1. Clone or download the repository.

Install dependencies:

    npm install express socket.io
Usage

Start the server:
                        
    node server.js
(By default, the server listens on port 5000. Change server.js for a different port.)

Open your browser and go to:

    http://localhost:5000
Join the chat:

    Enter your username.

    Click Join to enter the chatroom.

    The messaging window appears with the "Chatroom" heading, chat input, send, and exit buttons.

Chat with others:

    Messages are visible in real time to all connected users.

    System updates inform users when someone joins or leaves.

How It Works

     Server: Manages user connections, relays chat messages and system updates.

    Client: Switches between login and chat screens; displays messages and user notifications dynamically; communicates via Socket.IO.

Customization

    To change the port, modify the PORT value in server.js.

    To update colors, fonts, or layout, edit public/style.css.

    To add more features (such as chat rooms, emojis, avatars), enhance server.js, code.js, and the relevant HTML.



License

    This project is for educational/demo purposes.

    Built with Node.js, Express, and Socket.IO. UI design is responsive and minimal for ease of demonstration.

    Just save this as README.md in your project root. Let me know if you'd like any further customizations or deployment tips!
