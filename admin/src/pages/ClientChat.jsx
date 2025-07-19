
import React, { useState, useEffect, useContext, useRef } from "react";
import { AdminContext } from "../context/AdminContext";
import { adminApi } from "../services/api";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const ClientChat = () => {
  const { socket, messages, setMessages } = useContext(AdminContext);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await adminApi.getClientChats();
        if (response.success) {
          const uniqueClients = Array.from(
            new Map(response.clients.map((c) => [String(c.chatId), c])).values()
          );
          setClients(uniqueClients.reverse());
        } else {
          toast.error(response.message || "Failed to fetch clients");
        }
      } catch (err) {
        toast.error("Network error while loading clients");
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (!selectedClient?.chatId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await adminApi.getMessages(selectedClient.chatId);
        if (response.success) {
          setMessages(response.messages || []);
          setTimeout(scrollToBottom, 100);
        } else {
          toast.error(response.message || "Failed to fetch messages");
        }
      } catch (err) {
        toast.error("Could not load messages");
      }
    };
    fetchMessages();
  }, [selectedClient, setMessages]);

  useEffect(() => {
    if (!socket || !selectedClient?.chatId) return;

    const currentChatId = String(selectedClient.chatId);
    socket.emit("join_chat", currentChatId);

    const handleIncoming = (msg) => {
      if (String(msg.chatId) !== currentChatId) return;
      setMessages((prev) =>
        !prev.some((m) => m._id === msg._id) ? [...prev, msg] : prev
      );
      setTimeout(scrollToBottom, 100);
    };

    socket.on("receive_message", handleIncoming);
    return () => socket.off("receive_message", handleIncoming);
  }, [socket, selectedClient?.chatId, setMessages]);

  const handleClientSelect = (client) => {
    if (selectedClient?.chatId !== client.chatId) {
      setSelectedClient(client);
      setNewMessage("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClient?.chatId) return;

    const data = {
      chatId: selectedClient.chatId,
      content: newMessage.trim(),
      sender: "admin",
    };

    try {
      const res = await adminApi.sendMessage(data);
      if (res.success) {
        const sent = { ...res.message, chatId: selectedClient.chatId };
        socket.emit("send_message", sent);
        setMessages((prev) =>
          !prev.some((m) => m._id === sent._id) ? [...prev, sent] : prev
        );
        setNewMessage("");
        setTimeout(scrollToBottom, 100);
      } else {
        toast.error(res.message || "Send failed");
      }
    } catch (err) {
      toast.error("Send failed");
    }
  };

  const formatTime = (t) => {
    try {
      return new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 rounded-4xl font-orbitron relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10"></div>
      <div className="absolute inset-0 z-0 to-transparent opacity-30 animate-pulse-slow"></div>

      <div className="relative z-10 max-w-full sm:max-w-7xl mx-auto rounded-3xl border shadow-glow-fuchsia transition-all duration-700 ease-in-out hover:shadow-glow-purple">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-2rem)]">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 border-rshadow-inner-dark-glow max-h-[300px] lg:max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-fuchsia-800/50 scrollbar-track-transparent">
            <div className="p-4 border-b">
              <h2 className="text-1xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-300 drop-shadow-lg">
                [CLIENT DIRECTORY]
              </h2>
            </div>
            {clients.map((client, idx) => (
              <div
                key={`${client.chatId}-${idx}`}
                onClick={() => handleClientSelect(client)}
                className={`min-h-[96px] p-4 border-b border-fuchsia-900/30 cursor-pointer transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:bg-fuchsia-900/20 relative group
                  ${
                    selectedClient?.chatId === client.chatId
                      ? "bg-gradient-to-r from-fuchsia-900/60 to-purple-800/50 shadow-inner-lg border-l-4 border-cyan-400 animate-border-pulse"
                      : ""
                  }
                `}
              >
                {selectedClient?.chatId === client.chatId && (
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-r-full"></div>
                )}
                <div className="flex justify-between items-center pl-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-300 truncate">
                      {client.name || "UNIDENTIFIED USER"}
                    </h3>
                    <p className="text-xs text-gray-400">{client.project}</p>
                    <p className="text-[10px] text-fuchsia-300 font-mono italic">
                      {client.package}
                    </p>
                  </div>
                  {client.unread > 0 && (
                    <span className="relative flex h-3.5 w-3.5 ml-auto">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-fuchsia-500"></span>
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xxs px-1.5 py-0.5 rounded-full shadow-md animate-bounce-short">
                        {client.unread}
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate group-hover:text-gray-300">
                  <span className="text-fuchsia-400 font-semibold">
                    // LAST:
                  </span>{" "}
                  {client.lastMessage}
                </p>
                <p className="text-[10px] text-gray-600 opacity-80 font-mono">
                  {client.timestamp &&
                    new Date(client.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Chat Panel */}
          <div className="w-full lg:flex-1 flex flex-col bg-transparent bg-gradient-to-b from-black/50 to-transparent">
            {selectedClient ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-fuchsia-800/40 bg-gradient-to-b from-purple-900/50 to-black/50">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-cyan-300 drop-shadow-xl tracking-tight">
                      [CLIENT: {selectedClient.name.toUpperCase()}]
                    </h2>
                    <span className="px-4 py-1 bg-green-700/40 text-green-300 rounded-full text-sm md:text-md font-semibold shadow-inner-green">
                      STATUS:{" "}
                      {selectedClient?.projectDetails?.paymentStatus?.toUpperCase() ||
                        "PENDING"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3 text-sm text-gray-300">
                    <div className="space-y-1">
                      <p>
                        <span className="font-bold text-white">[PROJECT]:</span>{" "}
                        {selectedClient.project}
                      </p>
                      <p>
                        <span className="font-bold text-white">[PACKAGE]:</span>{" "}
                        {selectedClient.package}
                      </p>
                      <p>
                        <span className="font-bold text-white">
                          [VALUATION]:
                        </span>{" "}
                        <span className="text-yellow-400">
                          {selectedClient?.projectDetails?.price ||
                            "ACCESS DENIED"}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <span className="font-bold text-white">[EMAIL]:</span>{" "}
                        <span className="text-blue-400">
                          {selectedClient?.projectDetails?.contact?.email ||
                            "ENCRYPTED"}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-white">
                          [CONTACT NO.]:
                        </span>{" "}
                        <span className="text-sky-400">
                          {selectedClient?.projectDetails?.contact?.phone ||
                            "OFFLINE"}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-white">
                          [INITIATED]:
                        </span>{" "}
                        <span className="text-gray-500">
                          {selectedClient?.projectDetails?.submittedAt
                            ? new Date(
                                selectedClient.projectDetails.submittedAt
                              ).toLocaleString()
                            : "UNKNOWN"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-purple-700/60 scrollbar-track-transparent"
                >
                  {messages.map((message, idx) => (
                    <div
                      key={`${message._id}-${idx}`}
                      className={`flex ${
                        message.sender === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-xl px-4 py-3 border relative shadow-lg transition-transform duration-300 ease-out hover:scale-[1.015] tracking-wide
                        ${
                          message.sender === "admin"
                            ? "bg-gradient-to-br from-fuchsia-800/60 to-purple-700/50 border-fuchsia-400/30 text-fuchsia-100 animate-fade-in-right-glow shadow-glow-fuchsia"
                            : "bg-gradient-to-br from-black/30 via-slate-900/30 to-transparent border-cyan-500/20 text-cyan-100 animate-fade-in-left-glow shadow-glow-purple"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                          {message.content}
                        </p>
                        <p className="text-[10px] text-right text-gray-500 mt-1 font-inter tracking-tight opacity-70">
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 sm:p-5 border-t border-fuchsia-800/40 bg-black/50">
                  <form
                    onSubmit={handleSend}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="INPUT COMMAND: _"
                      className="flex-1 bg-black/40 border border-fuchsia-700/50 text-cyan-300 placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-3 focus:ring-cyan-500/70 text-base sm:text-lg font-mono caret-cyan-400"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-fuchsia-700 to-purple-600 px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-btn-glow border border-cyan-400/30 flex items-center justify-center group"
                    >
                      <img
                        className="w-6 sm:w-8 h-6 sm:h-8 group-hover:rotate-12 transition-transform"
                        src={assets.send_icon}
                        alt="EXECUTE"
                      />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-600 text-xl sm:text-2xl font-light italic font-orbitron p-5 text-center">
                <p className="animate-pulse-slow">
                  <span className="text-cyan-400">&lt;SELECT_TARGET /&gt;</span>{" "}
                  INITIATE COMMUNICATION PROTOCOL
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
