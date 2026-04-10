import React from 'react';
import { Bot } from 'lucide-react';

/**
 * Pulsing dot animation displayed while the AI is generating a response.
 */
export default function TypingIndicator() {
  return (
    <div className="typing-indicator" id="typing-indicator" aria-live="polite">
      <div className="message-avatar ai" aria-hidden="true">
        <Bot size={18} />
      </div>
      <div className="typing-dots">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
