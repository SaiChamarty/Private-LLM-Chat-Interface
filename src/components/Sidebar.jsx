import React from 'react';
import {
  Plus,
  MessageSquare,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';
import { MOCK_CONVERSATIONS } from '../mockData';

/**
 * Collapsible sidebar with chat history and navigation.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether sidebar is visible
 * @param {Function} props.onClose - Close sidebar (mobile)
 * @param {Function} props.onNewChat - Start a new conversation
 * @param {string|null} props.activeConversationId - Currently selected conversation
 * @param {Function} props.onSelectConversation - Select a conversation
 */
export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  activeConversationId,
  onSelectConversation,
}) {
  const handleNewChat = () => {
    onNewChat();
    onClose?.();
  };

  const handleSelect = (id) => {
    onSelectConversation(id);
    onClose?.();
  };

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? '' : 'collapsed'}`}
        id="sidebar"
        role="navigation"
        aria-label="Chat navigation"
      >
        {/* Brand / Logo */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img src="/logo.png" alt="Junebase" className="sidebar-brand-logo" />
            <span className="sidebar-brand-text">Junebase</span>
          </div>

          {/* New Chat Button */}
          <button
            className="new-chat-btn"
            onClick={handleNewChat}
            id="new-chat-btn"
            aria-label="Start new chat"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        <div className="sidebar-divider" />

        {/* Chat History */}
        <span className="sidebar-section-label">Recent</span>
        <nav className="chat-history" aria-label="Chat history">
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              className={`chat-history-item ${
                activeConversationId === conv.id ? 'active' : ''
              }`}
              onClick={() => handleSelect(conv.id)}
              id={`chat-item-${conv.id}`}
              title={conv.title}
            >
              <MessageSquare
                size={16}
                className="chat-history-item-icon"
              />
              <span className="chat-history-item-text">{conv.title}</span>
            </button>
          ))}
        </nav>

        {/* Footer — User / Settings placeholder */}
        <div className="sidebar-footer">
          <button
            className="sidebar-footer-btn"
            id="sidebar-settings-btn"
            aria-label="Settings"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button
            className="sidebar-footer-btn"
            id="sidebar-user-btn"
            aria-label="User profile"
          >
            <div className="user-avatar">
              <User size={14} />
            </div>
            <span>User Profile</span>
            <ChevronDown size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </button>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
          style={{ display: 'block' }}
        />
      )}
    </>
  );
}
