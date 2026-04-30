// api/chat.js — Vercel Serverless Function
// Proxy seguro para xAI / Grok API
// La API key NUNCA sale al cliente; se lee desde variables de entorno de Vercel.

export default async function handler(req, res) {
  // Preflight CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'XAI_API_KEY no configurada en Vercel Environment Variables.'
    });
  }

  try {
    const { messages, model, systemPrompt, max_tokens, temperature } = req.body;

    const finalMessages = [];
    if (systemPrompt) finalMessages.push({ role: 'system', content: systemPrompt });
    if (Array.isArray(messages)) finalMessages.push(...messages);

    const xaiResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'grok-3-mini',
        messages: finalMessages,
        stream: false,
        ...(max_tokens && { max_tokens }),
        ...(temperature !== undefined && { temperature }),
      }),
    });

    const data = await xaiResponse.json();
    if (!xaiResponse.ok) return res.status(xaiResponse.status).json({ error: data });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
