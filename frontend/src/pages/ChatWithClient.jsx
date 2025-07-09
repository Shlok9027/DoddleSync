import React, { useState, useEffect, useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const ChatWithClient = () => {
  const { socket, token, BACKEND_URL } = useContext(ShopContext);
  const chatContainerRef = useRef(null);

  const [isAccepted, setIsAccepted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [projectDetails, setProjectDetails] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const fetchProjectStatus = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/project/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setIsAccepted(data.isAccepted);
        setProjectDetails(data.projectDetails);
      } else {
        console.error("Status fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Status fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProjectStatus();
  }, [token]);

  useEffect(() => {
    if (!isAccepted) {
      const interval = setInterval(fetchProjectStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [isAccepted]);

  useEffect(() => {
    if (!projectDetails?.chatId || !token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/chat/message/${projectDetails.chatId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
          setTimeout(scrollToBottom, 100);
        }
      } catch (err) {
        console.error("Message fetch error:", err);
      }
    };

    fetchMessages();
  }, [projectDetails?.chatId, token]);

  useEffect(() => {
    if (!socket || !projectDetails?.chatId) return;

    const currentChatId = String(projectDetails.chatId);
    socket.emit("join_chat", currentChatId);

    const handleIncoming = (message) => {
      if (String(message.chatId) === currentChatId && message.sender !== "user") {
        setMessages((prev) => {
          if (!prev.some((m) => m._id === message._id)) {
            return [...prev, message];
          }
          return prev;
        });
        setTimeout(scrollToBottom, 100);
      }
    };

    socket.on("receive_message", handleIncoming);
    return () => socket.off("receive_message", handleIncoming);
  }, [socket, projectDetails?.chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !projectDetails?.chatId || !isAccepted || isSending) return;

    setIsSending(true);
    const messageData = {
      chatId: projectDetails.chatId,
      content: newMessage,
      sender: "user",
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });

      const data = await res.json();
      if (data.success) {
        const newMsg = {
          ...messageData,
          _id: data.message._id,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        socket.emit("send_message", newMsg);
        setNewMessage("");
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
   
    <div className="min-h-screen  text-white font-inter p-6 relative overflow-hidden">
  {/* Abstract Background Elements for depth */}
  <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-800 to-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-short animation-delay-2000"></div>
  <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-700 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-short animation-delay-4000"></div>
  <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-transparent to-transparent animate-pulse-slowest"></div>

  <div className="relative z-10 max-w-5xl mx-auto rounded-3xl border border-blue-700/40 bg-black/40 backdrop-blur-3xl shadow-data-flow transition-all duration-700 ease-in-out hover:shadow-data-flow-alt">
    {/* Header - System Status Panel */}
    <div className="px-4 py-4 rounded-t-3xl border-b border-blue-700/50 bg-blue-900/40 flex items-center justify-between relative overflow-hidden">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300 drop-shadow-lg tracking-tight font-orbitron">
        <span className="text-sm font-light mr-2 text-gray-400">[ PROJECT OVERVIEW ]</span> 
      </h2>
      <span
        className={`text-lg px-5 py-2 rounded-full font-semibold tracking-wide shadow-status-glow transition-all duration-300 transform hover:scale-105 ${
          isAccepted
            ? "bg-green-700/40 text-green-200 border border-green-500/30"
            : "bg-yellow-700/40 text-yellow-200 border border-yellow-500/30 animate-pulse"
        }`}
      >
        {isAccepted ? "STATUS: ACTIVE" : "STATUS: PENDING"}
      </span>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent animate-scan-line"></div>
    </div>

    <div
      ref={chatContainerRef}
      className="h-[420px] overflow-y-auto px-7 py-5 space-y-5 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      {!isAccepted && (
        <div className="text-center text-blue-200 bg-blue-700/30 rounded-xl p-5 animate-pulse-slowest border border-blue-500/30 shadow-md">
          <p className="text-lg font-semibold mb-2">INITIATING SECURE CHANNEL...</p>
          <p className="text-sm">Please await admin authorization to commence communication. Your request is being processed.</p>
        </div>
      )}
{messages.map((msg) => (
  <div
    key={msg._id}
    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[85%] sm:max-w-[75%] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg border relative transform transition-transform duration-300 ease-out hover:scale-[1.01] animate-in-holographic
        ${
          msg.sender === "user"
            ? "bg-gradient-to-br from-blue-700/70 to-cyan-600/60 text-white border-blue-500/40 animate-fade-in-right-holographic"
            : "bg-white/10 text-white backdrop-blur-md border border-gray-500/20 animate-fade-in-left-holographic"
        }`}
    >
      <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-mono mb-1">
        {msg.content}
      </p>
      <p className="text-[10px] sm:text-xs text-gray-300 mt-1 text-right opacity-80 font-inter">
        [SENT: {formatTime(msg.createdAt)}]
      </p>
    </div>
  </div>
))}

    </div>

    {/* Input - Transmission Module */}
    <div className="px-8 py-5 border-t border-blue-700/50 bg-black/50 relative overflow-hidden rounded-b-3xl">
     <form onSubmit={handleSendMessage} className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder={
      isAccepted ? "TRANSMIT MESSAGE: _" : "CHANNEL OFFLINE. AWAITING ACTIVATION..."
    }
    disabled={!isAccepted || isSending}
    className={`w-full bg-black/40 text-cyan-300 placeholder-gray-500 rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/70 shadow-input-module backdrop-blur-sm text-sm sm:text-base font-mono caret-cyan-400
      ${(!isAccepted || isSending) && "opacity-60 cursor-not-allowed"}
    `}
  />
  <button
    type="submit"
    disabled={!isAccepted || isSending}
    className={`rounded-xl transition-all bg-gradient-to-r from-blue-600 to-cyan-500 p-3 hover:scale-105 duration-300 shadow-send-button border border-cyan-400/30 backdrop-blur-md flex items-center justify-center group relative overflow-hidden
      ${(!isAccepted || isSending) && "opacity-60 cursor-not-allowed"}
    `}
  >
    <img
      src={assets.send_icon}
      alt="Transmit"
      className="w-6 sm:w-8 h-6 sm:h-8 transform group-hover:rotate-12 transition-transform"
    />
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 animate-ripple"></div>
  </button>
</form>

      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-blue-400 to-transparent animate-scan-line-reverse delay-1000"></div>
    </div>
  </div>
</div>
  );
};

export default ChatWithClient;
