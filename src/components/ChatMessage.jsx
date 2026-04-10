import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import CodeBlock from './CodeBlock';

/**
 * Single chat message component.
 * Renders user messages as styled bubbles and AI messages with markdown support.
 *
 * @param {Object} props
 * @param {Object} props.message - { id, role, content, timestamp }
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`message-row ${isUser ? 'user' : 'assistant'}`}
      id={`message-${message.id}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="message-avatar ai" aria-hidden="true">
          <Bot size={18} />
        </div>
      )}

      {/* Message Content */}
      <div className="message-content">
        <div
          className={`message-bubble ${
            isUser ? 'user-bubble' : 'ai-bubble'
          }`}
        >
          {isUser ? (
            <span>{message.content}</span>
          ) : (
            <ReactMarkdown
              components={{
                code: CodeBlock,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* User avatar on the right */}
      {isUser && (
        <div className="message-avatar user-msg-avatar" aria-hidden="true">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
