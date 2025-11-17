import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SOCKET_SERVER_URL ?? "http://localhost:3000";
    const socket = io(serverUrl, {
      transports: ["websocket"],
      autoConnect: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    const handleConnect = () => {
        console.log("connected to server");
      setIsConnected(true);
      setConnectionError(null);
    };

    const handleDisconnect = () => {
        console.log("disconnected to server");
      setIsConnected(false);
    };

    const handleError = (error) => {
      setConnectionError(error?.message ?? "Unable to connect to socket server");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    // return () => {
    //   socket.off("connect", handleConnect);
    //   socket.off("disconnect", handleDisconnect);
    //   socket.off("connect_error", handleError);
    //   socket.disconnect();
    //   socketRef.current = null;
    // };
  }, []);

  const sendMessage = useCallback((eventName, payload) => {
    if (!socketRef.current) return;
    socketRef.current.emit(eventName, payload);
  }, []);

  const subscribeToEvent = useCallback((eventName, handler) => {
    if (!socketRef.current) return () => {};
    socketRef.current.on(eventName, handler);
    return () => {
      socketRef.current?.off(eventName, handler);
    };
  }, []);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      connectionError,
      sendMessage,
      subscribeToEvent,
    }),
    [isConnected, connectionError, sendMessage, subscribeToEvent]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

