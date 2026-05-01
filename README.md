# Kurakani 💬

> A premium, production-ready real-time messaging platform built with the MERN stack.  
> Features: real-time chat, voice messages, image sharing, 1:1 voice & video calls (WebRTC), friends system, online status, typing indicators, and a stunning glassmorphic dark UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS (glassmorphism dark theme) |
| State | Zustand |
| Forms | Formik + Yup |
| HTTP | Axios |
| Real-time | Socket.io client |
| Calls | WebRTC (RTCPeerConnection) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| File Upload | Multer |
| Dev Server | Nodemon |

---

## Project Structure

```
Kurakani/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── friendController.js
│   │   └── messageController.js
│   ├── middleware/
│   │   └── auth.js             # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── FriendRequest.js
│   │   ├── Message.js
│   │   └── CallLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── friends.js
│   │   └── messages.js
│   ├── uploads/                # Auto-created at runtime
│   │   ├── profiles/
│   │   ├── voices/
│   │   └── images/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Express + Socket.io entry
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Avatar.tsx
    │   │   ├── CallModal.tsx
    │   │   ├── ChatBubble.tsx
    │   │   ├── ChatWindow.tsx
    │   │   ├── FriendRequests.tsx
    │   │   ├── ImageViewer.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── TypingIndicator.tsx
    │   │   ├── UserSearch.tsx
    │   │   ├── VideoCallScreen.tsx
    │   │   ├── VoiceMessagePlayer.tsx
    │   │   └── VoiceRecorder.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── ProfileSetup.tsx
    │   │   └── Dashboard.tsx
    │   ├── services/
    │   │   ├── api.ts            # Axios instance
    │   │   ├── authService.ts
    │   │   ├── userService.ts
    │   │   ├── friendService.ts
    │   │   ├── messageService.ts
    │   │   ├── socketService.ts  # Socket.io singleton
    │   │   └── webrtcService.ts  # WebRTC logic
    │   ├── stores/
    │   │   ├── useAuthStore.ts
    │   │   ├── useChatStore.ts
    │   │   ├── useFriendStore.ts
    │   │   └── useCallStore.ts
    │   ├── utils/
    │   │   └── dateUtils.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── postcss.config.js
```

---

## Prerequisites

- **Node.js** v18 or later — https://nodejs.org
- **MongoDB** running locally on port 27017 (or use MongoDB Atlas)
  - Local install: https://www.mongodb.com/try/download/community
  - Or run with Docker: `docker run -d -p 27017:27017 mongo`

---

## Setup & Run

### 1. Clone / navigate to the project

```bash
cd Kurakani
```

### 2. Backend setup

```bash
cd backend
npm install
```

Copy the example env (already created as `.env`):
```bash
# Already exists as backend/.env — edit if needed:
# MONGODB_URI=mongodb://localhost:27017/kurakani
# JWT_SECRET=your_secret_here
```

Start backend:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend setup (new terminal)

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## Environment Variables

### `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kurakani
JWT_SECRET=kurakani_super_secret_jwt_2024_change_in_prod
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register with username + optional phone |
| POST | `/api/auth/login` | Login with username or phone |
| GET | `/api/auth/me` | Get current user (JWT required) |
| POST | `/api/auth/logout` | Logout (updates online status) |

### Users
| Method | Route | Description |
|---|---|---|
| GET | `/api/users/search?q=` | Search users |
| PUT | `/api/users/profile` | Update profile (multipart) |
| GET | `/api/users/:id` | Get user by ID |

### Friends
| Method | Route | Description |
|---|---|---|
| POST | `/api/friends/request` | Send friend request |
| GET | `/api/friends/requests` | Get received/sent requests |
| PUT | `/api/friends/accept/:id` | Accept request |
| PUT | `/api/friends/reject/:id` | Reject request |
| GET | `/api/friends` | Get friends list |
| DELETE | `/api/friends/:id` | Remove friend |

### Messages
| Method | Route | Description |
|---|---|---|
| POST | `/api/messages` | Send message (text/voice/image) |
| GET | `/api/messages/:userId` | Get conversation |
| PUT | `/api/messages/read/:senderId` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |
| GET | `/api/messages/unread` | Unread counts |

---

## Socket.io Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `user:online` | `userId` | User connected |
| `message:send` | message object | Send a message |
| `typing:start` | `{senderId, receiverId}` | Start typing |
| `typing:stop` | `{senderId, receiverId}` | Stop typing |
| `message:read` | `{senderId, receiverId}` | Mark read |
| `call:initiate` | `{to, from, callType, offer, callerInfo}` | Start WebRTC call |
| `call:answer` | `{to, from, answer}` | Accept call |
| `call:reject` | `{to, from}` | Reject call |
| `call:end` | `{to}` | End call |
| `call:ice-candidate` | `{to, candidate}` | ICE exchange |

### Server → Client
| Event | Description |
|---|---|
| `message:receive` | New incoming message |
| `typing:start/stop` | Typing indicator |
| `user:status` | Online/offline change |
| `message:read` | Read receipt |
| `call:incoming` | Incoming call |
| `call:answered` | Call accepted |
| `call:rejected` | Call declined |
| `call:ended` | Call ended |
| `call:ice-candidate` | ICE candidate |
| `friend:request` | New friend request |
| `friend:accepted` | Friend request accepted |

---

## Testing Guide

### 1. Register & Login
- Go to `http://localhost:5173/register`
- Enter username (min 3 chars), optional phone, password (min 6 chars)
- You'll be redirected to Profile Setup
- Upload a profile photo, set display name and status → Continue

### 2. Add Friends
- From Dashboard → click **Search** tab
- Type at least 2 characters of another user's username
- Click the **+** button to send a friend request
- Open second browser window → login as another user → **Requests** tab → Accept

### 3. Real-time Chat
- Click a friend in the **Chats** tab
- Type a message and press Enter or click Send
- Messages appear instantly in both windows
- Green dot = online, typing bubbles appear when other user types

### 4. Voice Messages
- In chat: click the **microphone** button to start recording
- Click the **stop** button to finish — message sends automatically
- Waveform player appears in chat bubble

### 5. Image Sharing
- Click the **image** icon next to the input → select a photo
- Preview appears above input → click Send
- Click any image in chat to view fullscreen

### 6. Voice & Video Calls
- Open chat with a friend → click phone/camera icon in header
- The other user sees an incoming call screen with Accept/Decline
- Voice call: audio only, Video call: camera + microphone PiP view
- Both parties must allow browser media permissions

---

## Troubleshooting

| Issue | Fix |
|---|---|
| MongoDB connection failed | Ensure MongoDB is running: `mongod` or start the service |
| Port 5000 in use | Change `PORT` in `backend/.env` |
| CORS error | Ensure `CLIENT_URL` in `.env` matches your frontend URL |
| Camera/mic not working | Use HTTPS in production; localhost works without HTTPS |
| `npm install` fails | Delete `node_modules` and run again |

---

## Production Notes

- Set `NODE_ENV=production` in backend `.env`  
- Change `JWT_SECRET` to a cryptographically random string  
- Use MongoDB Atlas for cloud database  
- Use HTTPS (required for WebRTC in production)  
- Replace local file storage with AWS S3 / Cloudinary for uploads  
- Add TURN server credentials for WebRTC NAT traversal  
