import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';

/**
 * Scrollable chat message feed.
 * Auto-scrolls to bottom when new messages arrive.
 *
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether AI is typing
 * @param {Function} props.onSuggestionClick - Handle suggestion chip clicks
 */
export default function ChatFeed({ messages, isLoading, onSuggestionClick }) {
  const feedRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages or loading state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return <EmptyState onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <div className="chat-feed" ref={feedRef} id="chat-feed">
      <div className="chat-feed-inner">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  );
}
