import React from 'react';
import { Sparkles, Code, Lightbulb, FileText, Zap } from 'lucide-react';
import { SUGGESTION_PROMPTS } from '../mockData';

const iconMap = {
  Code: Code,
  Lightbulb: Lightbulb,
  FileText: FileText,
  Zap: Zap,
};

/**
 * Empty state screen shown when a new chat has no messages.
 *
 * @param {Object} props
 * @param {Function} props.onSuggestionClick - Called with the suggestion text
 */
export default function EmptyState({ onSuggestionClick }) {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-state-icon">
        <Sparkles size={28} />
      </div>

      <div>
        <h1 className="empty-state-title">How can I help you today?</h1>
        <p className="empty-state-subtitle">
          Junebase is your AI assistant running entirely on your local machine.
          Ask me anything — your data never leaves your device.
        </p>
      </div>

      <div className="suggestion-chips" role="list" aria-label="Suggested prompts">
        {SUGGESTION_PROMPTS.map((suggestion, index) => {
          const IconComponent = iconMap[suggestion.icon] || Lightbulb;
          return (
            <button
              key={index}
              className="suggestion-chip"
              onClick={() => onSuggestionClick(suggestion.text)}
              id={`suggestion-chip-${index}`}
              role="listitem"
            >
              <IconComponent size={16} className="suggestion-chip-icon" />
              <span>{suggestion.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
