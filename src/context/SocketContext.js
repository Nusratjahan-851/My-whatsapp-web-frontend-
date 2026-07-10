import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// আপনার ব্যাকএন্ড এন্ডপয়েন্ট (রেন্ডার বা লোকালহোস্ট ইউআরএল)
// এখানে ট্রিক হলো: .env থেকে সরাসরি মেইন ডোমেন নিতে হবে, তাই /api/v1 বাদ দিয়ে শুধু ডোমেন রুট পাঠানো ভালো
const SOCKET_URL = process.env.REACT_APP_API_ENDPOINT 
  ? process.env.REACT_APP_API_ENDPOINT.replace("/api/v1", "") 
  : "http://localhost:3000";

// সকেট ইনিশিয়ালিজেশন (এখানে আপনার দেওয়া কোডটি যুক্ত করা হলো)
export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity, // ২৪ ঘণ্টা নিরবচ্ছিন্নভাবে কানেক্ট করার চেষ্টা করবে
  reconnectionDelay: 2000,         // প্রতি ২ সেকেন্ড পর পর ট্রাই করবে
});

// বাকি Context কোড যা প্রজেক্টে ইতিমধ্যে আছে (যেমন নিচে দেওয়া হলো):
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
