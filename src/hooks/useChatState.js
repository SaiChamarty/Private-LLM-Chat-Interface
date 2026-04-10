import { useState, useCallback, useRef } from 'react';
import { fetchAIResponse } from '../mockData';

/**
 * Central chat state management hook.
 * Manages conversations, messages, and AI interaction.
 *
 * Replace fetchAIResponse() with your real API call to swap in the backend.
 */
export function useChatState() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // ---- SWAP POINT: Replace fetchAIResponse with your real API call ----
      const aiText = await fetchAIResponse(content);

      const aiMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: aiText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
    setIsLoading(false);
  }, []);

  const selectConversation = useCallback((conversationId) => {
    // In a real app, this would fetch messages for the selected conversation
    setActiveConversationId(conversationId);
    setMessages([]);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    activeConversationId,
    sendMessage,
    startNewChat,
    selectConversation,
  };
}
