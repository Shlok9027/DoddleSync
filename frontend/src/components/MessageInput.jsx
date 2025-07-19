import React, { useState } from 'react'

const MessageInput = ({onSend}) => {

    const [message, setMessage] = useState('');

    const handleSubmit  = (e) => {
        e.preventDefault()
        if(message.trim()) {
            onSend(message);
            setMessage('')
        }
    }

  return (
   <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 border border-purple-500/30 rounded-xl px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2 rounded-xl"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput