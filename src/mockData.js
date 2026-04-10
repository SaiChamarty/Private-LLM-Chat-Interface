/**
 * Mock data for development. Replace these with real API calls later.
 */

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Explain quantum computing basics',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'conv-2',
    title: 'Python FastAPI best practices',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 'conv-3',
    title: 'How to deploy ML models locally',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'conv-4',
    title: 'Write a Rust HTTP server',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const MOCK_AI_RESPONSES = [
  `Great question! Here's a comprehensive overview:

## Key Concepts

When working with **local LLMs**, there are several important factors to consider:

1. **Model Selection** — Choose a model that fits your hardware constraints
2. **Quantization** — Reduce model size with techniques like GGUF/GPTQ
3. **Inference Speed** — Optimize with batching and caching

Here's a simple Python example using a local API:

\`\`\`python
import requests

def query_local_llm(prompt):
    response = requests.post(
        "http://localhost:8080/v1/completions",
        json={
            "prompt": prompt,
            "max_tokens": 512,
            "temperature": 0.7
        }
    )
    return response.json()["choices"][0]["text"]

result = query_local_llm("Explain transformers")
print(result)
\`\`\`

> **Pro Tip:** Always benchmark your model on representative tasks before deploying to production.

Let me know if you'd like me to dive deeper into any of these topics!`,

  `That's a great approach! Let me break it down:

### Setting Up Your Environment

First, make sure you have the necessary dependencies:

\`\`\`bash
pip install fastapi uvicorn torch transformers
\`\`\`

### Architecture Overview

The recommended architecture uses a **layered approach**:

- **API Layer** — FastAPI routes handling HTTP requests
- **Service Layer** — Business logic and model management
- **Model Layer** — Direct interaction with the ML model

Here's the core structure:

\`\`\`typescript
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  messages: ChatMessage[];
  model: string;
}
\`\`\`

This keeps things modular and easy to extend. Would you like me to elaborate on any specific part?`,

  `Absolutely! Here's what I'd recommend:

The key differences between the approaches are:

| Feature | Approach A | Approach B |
|---------|-----------|-----------|
| Speed | ⚡ Fast | 🐌 Slower |
| Memory | 4GB | 8GB |
| Accuracy | 92% | 97% |

For most use cases, **Approach A** strikes the best balance between performance and resource usage. However, if accuracy is critical, go with Approach B.

Remember to always \`validate your inputs\` before processing them through the model pipeline.`,
];

export const SUGGESTION_PROMPTS = [
  {
    icon: 'Code',
    text: 'Help me write a Python script for data analysis',
  },
  {
    icon: 'Lightbulb',
    text: 'Explain how transformer models work',
  },
  {
    icon: 'FileText',
    text: 'Summarize a research paper for me',
  },
  {
    icon: 'Zap',
    text: 'Optimize my database queries',
  },
];

/**
 * Simulates an AI response with a delay.
 * Replace this function with a real API call to your local LLM.
 *
 * @param {string} _userMessage - The user's message (unused in mock)
 * @returns {Promise<string>} The mock AI response
 */
export async function fetchAIResponse(_userMessage) {
  const delay = 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const randomIndex = Math.floor(Math.random() * MOCK_AI_RESPONSES.length);
  return MOCK_AI_RESPONSES[randomIndex];
}
