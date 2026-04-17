import { useState, useCallback, useRef } from 'react';
import { fetchAIResponse } from '../api';

/**
 * Central chat state management hook.
 * Manages conversations, messages, and AI interaction.
 *
 * @param {Function} getToken - Async function returning a Cloudflare Turnstile token
 */
export function useChatState(getToken) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get a fresh Turnstile token for this request
      const turnstileToken = await getToken();
      const aiText = await fetchAIResponse(content.trim(), turnstileToken, abortRef.current.signal);

      const aiMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: aiText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Don't show error if the request was intentionally aborted
      if (error.name === 'AbortError') return;

      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `⚠️ ${error.message || 'Something went wrong. Please try again.'}`,
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
