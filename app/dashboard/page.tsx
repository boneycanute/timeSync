"use client";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

const ChatCalendarPage = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://nikotin.cloud/webhook/0164d030-b5b5-492a-9ca2-d95c5f33aaef/chat",
      mode: "fullscreen",
      showWelcomeScreen: false,
      i18n: {
        en: {
          title: "Time Sync",
          subtitle: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Message Calendar Assistant...",
          footer: "",
        },
      },
    });
  }, []);

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Left Column - Chat */}
      <div className="w-1/3 h-full p-10">
        <div id="n8n-chat" className="w-full h-full">
          {/* n8n chat will be mounted here */}
        </div>
      </div>

      {/* Right Column - Calendar Placeholder */}
      <div className="w-2/3 h-full bg-white">
        {/* Calendar widget will be mounted here */}
      </div>

      {/* Custom CSS for black and white theme */}
      <style jsx global>{`
        :root {
          --chat--color-primary: #000000;
          --chat--color-primary-shade-50: #333333;
          --chat--color-primary-shade-100: #666666;
          --chat--color-secondary: #000000;
          --chat--color-secondary-shade-50: #333333;
          --chat--color-white: #ffffff;
          --chat--color-light: #ffffff;
          --chat--color-light-shade-50: #f0f0f0;
          --chat--color-light-shade-100: #e0e0e0;
          --chat--color-medium: #d0d0d0;
          --chat--color-dark: #000000;
          --chat--color-disabled: #999999;
          --chat--color-typing: #000000;

          --chat--message--bot--background: #f8f8f8;
          --chat--message--bot--color: #000000;
          --chat--message--user--background: #000000;
          --chat--message--user--color: #ffffff;

          --chat--header--background: #ffffff;
          --chat--header--color: #000000;
        }
      `}</style>
    </div>
  );
};

export default ChatCalendarPage;
