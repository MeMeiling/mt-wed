"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import Button from "/components/Button";
import Link from "next/link";

export default function ChatRoom() {
  const [name, setName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // เมื่อเปิดห้องแชทมาจะดึงข้อมูลข้อความจาก Firestore
  useEffect(() => {
    const savedName = localStorage.getItem("chatName");
    if (savedName) {
      setName(savedName);
      setIsNameSubmitted(true);
    }

    const q = query(collection(db, "chatroom"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleNameSubmit = () => {
    if (name.trim()) {
      setIsNameSubmitted(true);
      localStorage.setItem("chatName", name);  // เก็บชื่อใน localStorage เพื่อไม่ให้กรอกใหม่ทุกครั้ง
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        await addDoc(collection(db, "chatroom"), {
          name,
          message,
          timestamp: serverTimestamp(),
        });
        setMessage("");  // Clear the message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 relative" style={{ backgroundImage: "url('/bg3.jpg')" }}>
      <div className="w-full max-w-md p-6 box-background">
        {/* กรอกชื่อก่อนเข้าห้องแชท */}
        {!isNameSubmitted ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-maincolor mb-4">Enter Your Name</h1>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleNameSubmit} className="w-full mt-4">
              Join Chat
            </Button>
          </div>
        ) : (
          <div>
            {/* UI ห้องแชท */}
            <h1 className="text-4xl font-bold text-maincolor mb-6">Chat Room</h1>

            <div className="chat-messages box-background mb-4 h-[400px] overflow-y-scroll p-4 rounded-md">
              {/* แสดงข้อความที่มาจาก Firestore */}
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="message mb-2">
                    <strong>{msg.name}: </strong> {msg.message}
                  </div>
                ))
              ) : (
                <div>No messages yet...</div>
              )}
            </div>

            {/* ฟอร์มส่งข้อความ */}
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow p-2 rounded-l-md border"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md">
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ปุ่มย้อนกลับ */}
      <div className="absolute bottom-4 left-4 z-50">
        <Link href="/" className="text-white text-3xl font-bold hover:underline">← Back to home</Link>
      </div>
    </div>
  );
}
