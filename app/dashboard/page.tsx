"use client"
import React, { useState } from 'react';
import { CornerDownLeft, MessageCircle, Mic, Paperclip } from 'lucide-react';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from '@/components/ui/chat/chat-bubble';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! How can I assist you today?",
    sender: 'bot',
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    content: "I need help managing my calendar events.",
    sender: 'user',
    timestamp: '10:01 AM'
  },
  {
    id: '3',
    content: "I can help you with that. What specific aspect of calendar management would you like assistance with? I can help with scheduling, reminders, or organizing events.",
    sender: 'bot',
    timestamp: '10:01 AM'
  },
  {
    id: '4',
    content: "I'd like to set up recurring team meetings.",
    sender: 'user',
    timestamp: '10:02 AM'
  },
  {
    id: '5',
    content: "Great! I can help you schedule recurring team meetings. What frequency would you like for these meetings, and what time slot works best for your team?",
    sender: 'bot',
    timestamp: '10:02 AM'
  }
];

const DashboardPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you want to manage calendar events. Let me help you with that. Could you please provide more details about what you'd like to do?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Chat Section - 40% width */}
      <div className="w-[40%] border-r flex flex-col h-full">
        <div className="border-b p-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="font-semibold">Calendar Assistant</h2>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === 'user' ? 'sent' : 'received'}
              >
                <ChatBubbleAvatar
                  fallback={message.sender === 'user' ? 'U' : 'B'}
                />
                <div className="flex flex-col gap-1">
                  <ChatBubbleMessage>
                    {message.content}
                  </ChatBubbleMessage>
                  <ChatBubbleTimestamp
                    timestamp={message.timestamp}
                  />
                </div>
              </ChatBubble>
            ))}
          </ChatMessageList>
        </div>

        <div className="p-4 border-t">

<form
    className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
  >
    <ChatInput
      placeholder="Type your message here..."
      className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
    />
    <div className="flex items-center p-3 pt-0">
      <Button variant="ghost" size="icon">
        <Paperclip className="size-4" />
        <span className="sr-only">Attach file</span>
      </Button>

      <Button variant="ghost" size="icon">
        <Mic className="size-4" />
        <span className="sr-only">Use Microphone</span>
      </Button>

      <Button
        size="sm"
        className="ml-auto gap-1.5"
      >
        Send Message
        <CornerDownLeft className="size-3.5" />
      </Button>
    </div>
  </form>

        </div>
      </div>

      {/* Calendar Section - 60% width */}
      <div className="flex-1 p-6">
        <div className="border rounded-lg h-full p-4">
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <div className="flex items-center justify-center h-[80%] text-muted-foreground border-2 border-dashed rounded-lg">
            Calendar Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;