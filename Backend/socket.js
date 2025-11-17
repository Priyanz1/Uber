const { Server } = require('socket.io');
const UserModel = require('./Models/UserModel');
const CaptainModel = require('./Models/CaptainModel');

let io = null;

/**
 * Initialize Socket.IO server
 * @param {http.Server} server - HTTP server instance
 * @param {Object} corsOptions - CORS configuration options
 * @returns {Server} Socket.IO server instance
 */
const initializeSocket = (server, corsOptions = {}) => {
  if (io) {
    console.log('Socket.IO already initialized');
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: corsOptions.origin || ["http://localhost:5173"],
      credentials: corsOptions.credentials !== undefined ? corsOptions.credentials : true,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);


    socket.on('join',async (data)=>{
        const {userId,userType}=data;
        if(userType === 'user'){
           await UserModel.findByIdAndUpdate(userId,{
            socketId:SourceBufferList.id
           });
        }else if(userType === 'captain'){
            await CaptainModel.findByIdAndUpadte(userId,{socketId:socket.id});
        }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Handle custom events here if needed
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  console.log('🔌 Socket.IO initialized successfully');
  return io;
};

/**
 * Send message to a specific socket ID
 * @param {string} socketId - The socket ID to send message to
 * @param {string} event - Event name
 * @param {any} data - Data to send
 * @returns {boolean} Success status
 */
const sendMessageToSocketId = (socketId, event, data) => {
  if (!io) {
    console.error('Socket.IO not initialized. Call initializeSocket first.');
    return false;
  }

  if (!socketId) {
    console.error('Socket ID is required');
    return false;
  }

  try {
    io.to(socketId).emit(event, data);
    console.log(`📤 Message sent to ${socketId} on event: ${event}`);
    return true;
  } catch (error) {
    console.error(`Error sending message to ${socketId}:`, error);
    return false;
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};

