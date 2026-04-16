/**
 * API service for the Junebase Chat backend.
 * Endpoint: https://chat.junebase.com/chat
 *
 * Sends a POST request with { prompt } and expects { reply } in response.
 */

const API_URL = 'https://chat.junebase.com/chat';

/**
 * Send a message to the Junebase Chat API and return the reply.
 *
 * @param {string} prompt - The user's message
 * @param {AbortSignal} [signal] - Optional AbortController signal for cancellation
 * @returns {Promise<string>} The AI reply text
 * @throws {Error} If the request fails or is aborted
 */
export async function fetchAIResponse(prompt, signal) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.reply;
}
