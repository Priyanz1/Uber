const { Server } = require('socket.io');
const UserModel = require('./Models/UserModel');
const CaptainModel = require('./Models/CaptainModel');

let io = null;

const initializeSocket = (server, corsOptions = {}) => {
  if (io) {
    console.log('Socket.IO already initialized');
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: corsOptions.origin || ["http://localhost:5173"],
      credentials: corsOptions.credentials ?? true,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // JOIN EVENT
    socket.on('join', async ({ userId, userType }) => {
      try {
        if (userType === 'user') {
          await UserModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
          console.log(`👤 User joined with socket: ${socket.id}`);
        }

        if (userType === 'captain') {
          await CaptainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
          console.log(`🧑‍✈️ Captain joined with socket: ${socket.id}`);
        }

      } catch (err) {
        console.error("Error in join event:", err);
      }
    });
   
    socket.on('update-location-captain',async (data)=>{
      const {userId,location}=data;
      console.log(`UserId ${userId} location ${location}`);
      if(!location || !location.ltd || !location.lng){
        return socket.emit('error',{message:'Invalid location data'})
      }
        await CaptainModel.findByIdAndUpdate(userId,{location:{
          ltd:location.ltd,
          lng:location.lng
        }});

    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  console.log('🔌 Socket.IO initialized successfully');
  return io;
};


// const sendMessageToSocketId = (socketId, event, data) => {
//   if (!io) {
//     console.error('Socket.IO not initialized. Call initializeSocket first.');
//     return false;
//   }

//   if (!socketId) {
//     console.error('Socket ID is required');
//     return false;
//   }

//   try {
//     io.to(socketId).emit(event, data);
//     console.log(`📤 Message sent to ${socketId} on event: ${event}`);
//     return true;
//   } catch (error) {
//     console.error(`Error sending message to ${socketId}:`, error);
//     return false;
//   }
// };
const sendMessageToSocketId = (socketId, messageObj) => {
    if(io){
    io.to(socketId).emit(messageObj.event, messageObj.data);
  }else{
    console.error('Socket.IO instance is not available.');
  }
  
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};
