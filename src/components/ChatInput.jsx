import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Send, Paperclip, Globe } from 'lucide-react';

/**
 * Chat input area with auto-expanding textarea and action buttons.
 *
 * @param {Object} props
 * @param {Function} props.onSend - Called with message text
 * @param {boolean} props.disabled - Disable input while AI is responding
 */
export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [webSearchActive, setWebSearchActive] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="input-area" id="input-area">
      <div className="input-container">
        <div className="input-main">
          {/* Left action icons */}
          <div className="input-actions-left">
            <button
              className="input-action-btn"
              title="Attach file (coming soon)"
              aria-label="Attach file"
              id="attach-file-btn"
            >
              <Paperclip size={18} />
            </button>
            <button
              className={`input-action-btn ${webSearchActive ? 'active' : ''}`}
              title="Toggle web search"
              aria-label="Toggle web search"
              id="web-search-btn"
              onClick={() => setWebSearchActive((prev) => !prev)}
            >
              <Globe size={18} />
            </button>
          </div>

          {/* Textarea */}
          <div className="input-textarea-wrapper">
            <textarea
              ref={textareaRef}
              className="input-textarea"
              id="chat-input-textarea"
              placeholder="Message Junebase…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={disabled}
              aria-label="Chat message input"
            />
          </div>

          {/* Send button */}
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            id="send-btn"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="input-footer">
          <span className="input-footer-text">
            Junebase runs locally — your data stays on your device
          </span>
        </div>
      </div>
    </div>
  );
}
