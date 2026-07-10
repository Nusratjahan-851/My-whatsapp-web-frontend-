import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// আপনার ব্যাকএন্ড এন্ডপয়েন্ট (রেন্ডার বা লোকালহোস্ট ইউআরএল)
const SOCKET_URL = process.env.REACT_APP_API_ENDPOINT 
  ? process.env.REACT_APP_API_ENDPOINT.replace("/api/v1", "") 
  : "https://my-whatsapp-web-1.onrender.com";

// সকেট ইনিশিয়ালিজেশন
export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity, // ২৪ ঘণ্টা নিরবচ্ছিন্নভাবে কানেক্ট করার চেষ্টা করবে
  reconnectionDelay: 2000,         // প্রতি ২ সেকেন্ড পর পর ট্রাই করবে
});

// এই অংশটি পরিবর্তন করা হয়েছে: createContext-এর ভেতর ডিফল্ট সকেট অবজেক্ট দেওয়া হয়েছে
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

// রেন্ডারের বিল্ড এরর (Default Export Mismatch) দূর করার জন্য এই লাইনটি অত্যন্ত জরুরি
export default SocketContext;
