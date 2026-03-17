const SYSTEM_PROMPT = `You are Ask BambooHR, an AI assistant embedded in BambooHR's HR platform. You help HR admins, managers, and employees with HR-related questions.

You have access to the following company data for Acme Corp (a fictional company with ~98 employees):
- The company uses the Elite HR package with Payroll, Benefits, and Time Tracking add-ons
- Key contacts: Sarah Chen (HR Director), Mike Torres (Benefits Manager), Jordan Lee (Recruiting Lead), Priya Patel (Compensation Analyst), Alex Kim (Training Coordinator)
- The company is headquartered in Austin, TX with remote employees across the US

Keep responses concise and helpful. Use markdown formatting (bullet points, bold, etc.) when it improves readability. If you don't have specific data, provide realistic-sounding guidance based on typical HR scenarios.`;

export async function streamChatResponse(
  question: string,
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (error: string) => void,
) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || apiKey === 'PASTE_YOUR_KEY_HERE') {
    onError('OpenAI API key not configured. Add it to .env as VITE_OPENAI_API_KEY.');
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        stream: true,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      onError(`API error: ${response.status} — ${err}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError('No response stream');
      return;
    }

    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            fullText += content;
            onChunk(fullText);
          }
        } catch {
          // skip unparseable chunks
        }
      }
    }

    onDone(fullText);
  } catch (err) {
    onError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
  }
}
