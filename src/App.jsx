import React, { useState, useCallback } from 'react';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  ChevronDown,
  Share2,
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import ChatFeed from './components/ChatFeed';
import ChatInput from './components/ChatInput';
import { useChatState } from './hooks/useChatState';
import { useTheme } from './hooks/useTheme';
import { useTurnstile } from './hooks/useTurnstile';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { containerRef: turnstileRef, getToken } = useTurnstile();

  const {
    messages,
    isLoading,
    activeConversationId,
    sendMessage,
    startNewChat,
    selectConversation,
  } = useChatState(getToken);

  const handleSuggestionClick = useCallback(
    (text) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={startNewChat}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
      />

      {/* Main Chat Area */}
      <main className="main-area" id="main-chat-area">
        {/* Header */}
        <header className="main-header" id="main-header">
          <div className="header-left">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((prev) => !prev)}
              id="sidebar-toggle-btn"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {sidebarOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>

            <button className="model-selector" id="model-selector-btn">
              <span className="model-indicator" />
              <span>Local Model</span>
              <ChevronDown size={14} style={{ opacity: 0.5 }} />
            </button>
          </div>

          <div className="header-right">
            <button
              className="header-icon-btn"
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="header-icon-btn"
              id="share-btn"
              aria-label="Share conversation"
              title="Share (coming soon)"
            >
              <Share2 size={18} />
            </button>
          </div>
        </header>

        {/* Chat Feed */}
        <ChatFeed
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Input Area */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />

        {/* Invisible Cloudflare Turnstile widget */}
        <div ref={turnstileRef} id="turnstile-container" style={{ position: 'fixed', bottom: 0, left: 0, zIndex: -1, opacity: 0, pointerEvents: 'none' }} />
      </main>
    </div>
  );
}
